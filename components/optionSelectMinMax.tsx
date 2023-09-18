// 입력하자마자 바로바로 dispatch 되는 필터링 옵션 선택창
'use client';
import { useDispatch, useSelector } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import Image from 'next/image';
import { setFilters, addSelectedField, removeSelectedField } from '@/app/lib/store/filters';
import { FilterableFields, FilterableFieldsKR } from '@/app/lib/constans';
import { RootState } from '@/app/lib/store/reduxType';
import { Tooltip, Typography, Button, Chip } from '@material-tailwind/react';

// 타입 지정
type Option = {
  value: string;
  type: string;
  label: string;
};

const OptionSelectMinMax = () => {
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
  const selectedFields = useSelector((state: RootState) => state.filters.selectedFields);

  // select option ( 최대 최소 필터링 옵션 )
  const filteredFields = FilterableFields.filter((field) => field !== 'Name');
  const fields = filteredFields.map((field, index) => [field, FilterableFieldsKR[index]]);
  const options = fields.flatMap((fieldPair) => [
    { value: `${fieldPair[0]}-min`, type: 'min', label: `${fieldPair[1][0]} (Min)` },
    { value: `${fieldPair[0]}-max`, type: 'max', label: `${fieldPair[1][0]} (Max)` },
  ]);

  // 선택된 옵션들 처리
  const handleOptionChange = (selectedOptions: MultiValue<{ value: string; type: string; label: string }> | null) => {
    const newSelectedFields = selectedOptions?.map((option) => option.value) || [];

    // 필드 추가
    newSelectedFields.forEach((field) => {
      if (!selectedFields.includes(field)) {
        dispatch(addSelectedField(field));
      }
    });

    // 필드 삭제
    selectedFields.forEach((field) => {
      if (!newSelectedFields.includes(field)) {
        dispatch(removeSelectedField(field));

        // 필터 설정 업데이트 부분 추가
        const updatedFilters = { ...actualFilters };
        const parts = field.split('-');
        const fieldName = parts[0];
        const type = parts[1] as 'min' | 'max';

        if (updatedFilters[fieldName]) {
          delete updatedFilters[fieldName][type]; // type에 해당하는 속성을 완전히 삭제

          // 만약 field 객체 내부가 빈 객체가 되면, field 자체를 삭제
          if (Object.keys(updatedFilters[fieldName]).length === 0) {
            delete updatedFilters[fieldName];
          }

          // 업데이트된 필터 설정을 dispatch
          dispatch(setFilters(updatedFilters));
        }
      }
    });
  };

  // 필터 값 처리
  const handleInputChange = (field: string, type: 'min' | 'max', value: string) => {
    if (value !== '') {
      handleFilterChange(field, type, parseInt(value, 10));
    }
  };

  const handleFilterChange = (field: string, type: 'min' | 'max', value: number) => {
    if (field !== 'Name') {
      const updatedFilters = {
        ...actualFilters,
        [field]: {
          ...actualFilters[field],
          [type]: value,
        },
      };

      // 바로바로 dispatch
      dispatch(setFilters(updatedFilters));
    }
  };

  const adjustValue = (field: string, type: 'min' | 'max', increment: boolean) => {
    const currentValue = type === 'min' ? actualFilters[field]?.min ?? 0 : actualFilters[field]?.max ?? 0;
    const adjustedValue = increment ? currentValue + 1 : currentValue - 1;
    if (adjustedValue >= 0) {
      handleFilterChange(field, type, adjustedValue);
    }
  };

  const handleDeleteField = (fieldWithType: string) => {
    const parts = fieldWithType.split('-');
    const field = parts[0];
    const type = parts[1] as 'min' | 'max';

    // 먼저, 선택된 필드를 삭제
    dispatch(removeSelectedField(fieldWithType));

    // 그 다음, 필터 설정을 업데이트
    const updatedFilters = { ...actualFilters };

    if (updatedFilters[field]) {
      delete updatedFilters[field][type]; // type에 해당하는 속성을 완전히 삭제

      // 만약 field 객체 내부가 빈 객체가 되면, field 자체를 삭제
      if (Object.keys(updatedFilters[field]).length === 0) {
        delete updatedFilters[field];
      }
    }

    // 업데이트된 필터 설정을 dispatch
    dispatch(setFilters(updatedFilters));
  };

  const tempSelectedOptions: Option[] = selectedFields
    .map((field) => options.find((opt) => opt.value === field))
    .filter((option): option is Option => Boolean(option));

  return (
    <>
      {/* 옵션선택창 */}
      <div className='flex w-option-container flex-col items-start space-y-2'>
        <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Values :'}</p>
        <div className='flex w-option-container flex-col items-end space-y-4 self-stretch'>
          <div className='w-option-container select-container'>
            <Select<Option, true>
              instanceId='option-select'
              isMulti
              options={options}
              placeholder='Select field'
              onChange={handleOptionChange}
              value={typeof tempSelectedOptions !== 'undefined' ? tempSelectedOptions : []}
            />
          </div>
          {selectedFields.map((fieldWithType) => {
            const parts = fieldWithType.split('-');
            const field = parts[0];
            const type = parts[1] as 'min' | 'max';
            const uiField = fields.find((item) => item[0] === field)?.[1][0] || field;
            const tooltip = fields.find((item) => item[0] === field)?.[1][1] || '';
            return (
              <div key={fieldWithType} className='filter-item'>
                <div className='flex justify-end space-x-4 self-stretch'>
                  <Chip
                    className='text-center p-0 pl-2 pr-2'
                    variant='ghost'
                    color='blue-gray'
                    size='md'
                    value={
                      <div className='w-fill flex items-center justify-center gap-[2px]'>
                        <Tooltip
                          placement='bottom'
                          className='border border-blue-gray-50 bg-white px-4 py-3 shadow-md shadow-black/10'
                          content={
                            <div className='w-full'>
                              <Typography color='blue-gray' className='font-medium text-[16px]'>
                                {uiField}
                              </Typography>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal text-[12px] opacity-80'
                              >
                                {tooltip}
                              </Typography>
                            </div>
                          }
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                            className='h-4 w-4 cursor-pointer text-blue-gray-500'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                            />
                          </svg>
                        </Tooltip>
                        <p className='w-[82px] text-[12px] font-normal leading-6 tracking-tight truncate'>
                          {uiField} ({type === 'min' ? 'Min' : 'Max'})
                        </p>
                      </div>
                    }
                  />
                  <div className='flex w-select-option justify-end items-center space-x-2 self-stretch relative'>
                    <button
                      type='button'
                      className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
                      onClick={() => adjustValue(field, type, false)}
                    >
                      <span className='m-auto'>-</span>
                    </button>
                    <div className='bg-transparent w-10 text-xs md:text-base flex items-center justify-center cursor-default'>
                      <input
                        type='number'
                        className='bg-transparent w-full text-xs md:text-base text-center flex items-center justify-center cursor-text'
                        value={actualFilters[field]?.[type] || ''}
                        onChange={(e) => handleInputChange(field, type, e.target.value)}
                        min={0}
                        placeholder='-'
                      />
                    </div>
                    <button
                      type='button'
                      className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
                      onClick={() => adjustValue(field, type, true)}
                    >
                      <span className='m-auto'>+</span>
                    </button>
                  </div>
                  <Button
                    onClick={() => handleDeleteField(fieldWithType)}
                    className='cursor-pointer w-[83px] h-[32px] shadow-none bg-gradient-to-t from-[#BF1616] to-[#AE0F0F] flex items-center justify-center hover:brightness-75 text-white rounded-md gap-[6px]'
                    variant='text'
                    ripple={false}
                  >
                    {/* <Image src='/del.svg' width={83} height={32} alt='삭제버튼' /> */}
                    <Image src='/minus.svg' width={24} height={24} alt='삭제버튼' />
                    <p className='font-sans text-sm font-medium'>{'DEL'}</p>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OptionSelectMinMax;
