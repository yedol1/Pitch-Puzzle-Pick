import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { MultiValue, ActionMeta } from 'react-select';
import Image from 'next/image';
import { setFilters, addSelectedField, removeSelectedField } from '@/app/lib/store/filters';
import { FilterableFields, FilterableFieldsKR } from '@/app/lib/constans';
import { Filters, RootState } from '@/app/lib/store/reduxType';

// 타입 지정
type Option = {
  value: string;
  type: string;
  label: string;
};

const OptionSelect = () => {
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
  const selectedFields = useSelector((state: RootState) => state.filters.selectedFields);
  const fields = FilterableFields.map((field, index) => [field, FilterableFieldsKR[index]]);
  const options = fields.flatMap((fieldPair) => [
    { value: `${fieldPair[0]}-min`, type: 'min', label: `${fieldPair[1]} (Min)` },
    { value: `${fieldPair[0]}-max`, type: 'max', label: `${fieldPair[1]} (Max)` },
  ]);

  const handleOptionChange = (
    selectedOptions: MultiValue<{ value: string; type: string; label: string }> | null,
    actionMeta: ActionMeta<{ value: string; type: string; label: string }>,
  ) => {
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
      }
    });
  };

  const handleFilterChange = (field: string, type: 'min' | 'max', value: number) => {
    const updatedFilters = {
      ...actualFilters,
      [field]: {
        ...actualFilters[field],
        [type]: value,
      },
    };
    dispatch(setFilters(updatedFilters));
  };

  const handleInputChange = (field: string, type: 'min' | 'max', value: string) => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue >= 0) {
      handleFilterChange(field, type, intValue);
    }
  };

  const adjustValue = (field: string, type: 'min' | 'max', increment: boolean) => {
    const currentValue = type === 'min' ? actualFilters[field]?.min ?? 0 : actualFilters[field]?.max ?? 0;
    const adjustedValue = increment ? currentValue + 1 : currentValue - 1;
    if (adjustedValue >= 0) {
      handleFilterChange(field, type, adjustedValue);
    }
  };
  const handleDeleteField = (field: string) => {
    dispatch(removeSelectedField(field));
  };
  const selectedOptions: Option[] = selectedFields
    .map((field) => options.find((opt) => opt.value === field))
    .filter((option): option is Option => Boolean(option));
  return (
    <div className='flex w-option-container flex-col items-start space-y-2'>
      <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Option :'}</p>
      <div className='flex w-option-container flex-col items-end space-y-4 self-stretch'>
        <div className='w-option-container select-container'>
          <Select<Option, true>
            isMulti
            options={options}
            placeholder='Select field'
            onChange={handleOptionChange}
            value={typeof selectedOptions !== 'undefined' ? selectedOptions : []}
          />
        </div>
        {selectedFields.map((fieldWithType) => {
          const parts = fieldWithType.split('-');
          const field = parts[0];
          const type = parts[1] as 'min' | 'max';
          const uiField = fields.find((item) => item[0] === field)?.[1] || field;
          return (
            <div key={fieldWithType} className='filter-item'>
              <div className='flex justify-end space-x-4 self-stretch'>
                <div className='w-fill flex items-center justify-center'>
                  <p className='text-sm font-normal leading-6 tracking-tight truncate'>
                    {uiField} ({type.toUpperCase()})
                  </p>
                </div>
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
                <div onClick={() => handleDeleteField(fieldWithType)} className='cursor-pointer'>
                  <Image src='/del.svg' width={83} height={32} alt='삭제버튼' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
