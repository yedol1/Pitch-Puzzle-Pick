// 입력하자마자 바로바로 dispatch 되는 필터링 옵션 선택창
import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import Image from 'next/image';
import { setFilters, addSelectedField, removeSelectedField } from '@/app/lib/store/filters';
import { FilterableFields, FilterableFieldsKR } from '@/app/lib/constans';
import { RootState } from '@/app/lib/store/reduxType';
import { Tooltip, Typography, Button, Chip, Input } from '@material-tailwind/react';

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
  const filteredTest = useSelector((state: RootState) => state.filters);
  const filteredFields = FilterableFields.filter((field) => field !== 'Club');
  const fields = filteredFields.map((field, index) => [field, FilterableFieldsKR[index]]);
  const options = fields.flatMap((fieldPair) => [
    { value: `${fieldPair[0]}-min`, type: 'min', label: `${fieldPair[1][0]} (Min)` },
    { value: `${fieldPair[0]}-max`, type: 'max', label: `${fieldPair[1][0]} (Max)` },
  ]);

  // 선택된 옵션들 처리
  const handleOptionChange = (selectedOptions: MultiValue<{ value: string; type: string; label: string }> | null) => {
    const newSelectedFields = selectedOptions?.map((option) => option.value) || [];
    console.log(selectedOptions);
    // 필드 추가
    newSelectedFields.forEach((field) => {
      if (!selectedFields.includes(field)) {
        console.log('add');
        console.log(field);
        dispatch(addSelectedField(field));
      }
    });
    console.log(newSelectedFields);
    console.log(selectedFields);
    // 필드 삭제
    selectedFields.forEach((field) => {
      if (!newSelectedFields.includes(field)) {
        console.log('remove');
        console.log(field);
        dispatch(removeSelectedField(field));
      }
    });
  };
  console.log(selectedFields);

  const handleClubChange = (value: string) => {
    // 바로바로 dispatch
    const updatedFilters = { ...actualFilters, Club: { value } };
    dispatch(setFilters(updatedFilters));
  };

  // 필터 값 처리
  const handleInputChange = (field: string, type: 'min' | 'max', value: string) => {
    if (value !== '') {
      handleFilterChange(field, type, parseInt(value, 10));
    }
  };

  const handleFilterChange = (field: string, type: 'min' | 'max', value: number) => {
    if (field !== 'Club') {
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
    console.log('접근');
    console.log(fieldWithType);
    dispatch(removeSelectedField(fieldWithType));
  };

  const tempSelectedOptions: Option[] = selectedFields
    .map((field) => options.find((opt) => opt.value === field))
    .filter((option): option is Option => Boolean(option));
  console.log(actualFilters);
  console.log(filteredTest);
  return (
    <section className='mt-[48px] flex Wrapper1:w-[880px] Wrapper2:w-[710px] Wrapper3:w-[610px] w-[440px] p-4 flex-col justify-center items-end rounded-lg bg-white shadow-custom'>
      <div className='flex w-full justify-center items-start content-start flex-wrap gap-x-[128px] self-stretch'>
        {/* 문자열 옵션 선택 박스 */}
        <div className='flex w-option-container flex-col items-start space-y-2'>
          {/* 클럽 검색창 */}
          <div className='flex w-option-container flex-col items-start space-y-2'>
            <label className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option' htmlFor='clubFilter'>
              {'Club:'}
            </label>
            <Input
              id='clubFilter'
              size='md'
              color='blue'
              label='Input Club (KR)'
              type='text'
              value={actualFilters.Club.value || ''}
              onChange={(e) => handleClubChange(e.target.value)}
            />
          </div>
        </div>
        {/* 숫자형 옵션 선택 박스 */}
        <div className='flex flex-col items-end w-[360px]'>
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
                console.log(fieldWithType);
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
        </div>
      </div>
    </section>
  );
};

export default OptionSelect;

// 검색버튼으로 통제 가능한 필터링 옵션 선택창
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Select, { MultiValue, ActionMeta } from 'react-select';
// import Image from 'next/image';
// import { setFilters, addSelectedField, removeSelectedField } from '@/app/lib/store/filters';
// import { FilterableFields, FilterableFieldsKR } from '@/app/lib/constans';
// import { Filters, RootState } from '@/app/lib/store/reduxType';
// import { Tooltip, Typography, Button, Chip, Input } from '@material-tailwind/react';

// // 타입 지정
// type Option = {
//   value: string;
//   type: string;
//   label: string;
// };

// const OptionSelect = () => {
//   const dispatch = useDispatch();
//   const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
//   const selectedFields = useSelector((state: RootState) => state.filters.selectedFields);
//   const filteredFields = FilterableFields.filter((field) => field !== 'Club');
//   const fields = filteredFields.map((field, index) => [field, FilterableFieldsKR[index]]);
//   const options = fields.flatMap((fieldPair) => [
//     { value: `${fieldPair[0]}-min`, type: 'min', label: `${fieldPair[1][0]} (Min)` },
//     { value: `${fieldPair[0]}-max`, type: 'max', label: `${fieldPair[1][0]} (Max)` },
//   ]);
//   const [tempClub, setTempClub] = useState<string>(actualFilters.Club.value || '');
//   const [tempSelectedFields, setTempSelectedFields] = useState<string[]>([]);
//   const [tempFilters, setTempFilters] = useState<Filters>({ Club: { value: '' } });
//   // 선택된 옵션들 처리
//   const handleOptionChange = (selectedOptions: MultiValue<{ value: string; type: string; label: string }> | null) => {
//     const newSelectedFields = selectedOptions?.map((option) => option.value) || [];
//     setTempSelectedFields(newSelectedFields);

//   };
//   const handleClubChange = (value: string) => {
//     setTempClub(value);
//   };
//   // 필터 값 처리
//   const handleInputChange = (field: string, type: 'min' | 'max', value: string) => {
//     if (value !== '') {
//       handleFilterChange(field, type, parseInt(value, 10));
//     }
//   };

//   const handleFilterChange = (field: string, type: 'min' | 'max', value: number) => {
//     if (field !== 'Club') {
//       const updatedFilters = {
//         ...tempFilters,
//         [field]: {
//           ...tempFilters[field],
//           [type]: value,
//         },
//       };
//       setTempFilters(updatedFilters);
//     }
//   };

//   const handleSearch = () => {
//     // Club 필터 dispatch
//     const updatedFilters = { ...tempFilters, Club: { value: tempClub } };
//     dispatch(setFilters(updatedFilters));

//     // 선택된 필드들 dispatch
//     tempSelectedFields.forEach((field) => {
//       dispatch(addSelectedField(field));
//     });
//   };
//   const tempClubRef = React.useRef('');

//   const adjustValue = (field: string, type: 'min' | 'max', increment: boolean) => {
//     const currentValue = type === 'min' ? tempFilters[field]?.min ?? 0 : tempFilters[field]?.max ?? 0;
//     const adjustedValue = increment ? currentValue + 1 : currentValue - 1;
//     if (adjustedValue >= 0) {
//       handleFilterChange(field, type, adjustedValue);
//     }
//   };

//   const handleDeleteField = (fieldWithType: string) => {
//     const updatedSelectedFields = tempSelectedFields.filter((field) => field !== fieldWithType);
//     setTempSelectedFields(updatedSelectedFields);

//     // 필드와 타입을 분리하여 tempFilters에서 해당 필드를 제거
//     const [field] = fieldWithType.split('-');
//     const updatedFilters = { ...tempFilters };
//     delete updatedFilters[field];
//     setTempFilters(updatedFilters);
//   };

//   const selectedOptions: Option[] = selectedFields
//     .map((field) => options.find((opt) => opt.value === field))
//     .filter((option): option is Option => Boolean(option));
//   const tempSelectedOptions: Option[] = tempSelectedFields
//     .map((field) => options.find((opt) => opt.value === field))
//     .filter((option): option is Option => Boolean(option));

//   console.log(tempFilters);
//   return (
//     <section className='mt-[48px] flex Wrapper1:w-[880px] Wrapper2:w-[710px] Wrapper3:w-[610px] w-[440px] p-4 flex-col justify-center items-end rounded-lg bg-white shadow-custom'>
//       <div className='flex w-full justify-center items-start content-start flex-wrap gap-x-[128px] self-stretch'>
//         <div className='flex w-option-container flex-col items-start space-y-2'>
//           <label className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option' htmlFor='clubFilter'>
//             {'Club:'}
//           </label>
//           <Input
//             id='clubFilter'
//             // className='rounded-[4px] focus:rounded-[2px]'
//             color='blue'
//             label='Input Club'
//             type='text'
//             value={tempClub}
//             onChange={(e) => handleClubChange(e.target.value)}
//           />
//         </div>
//         <div className='flex flex-col items-end w-[360px]'>
//           {/* 옵션선택창 */}
//           <div className='flex w-option-container flex-col items-start space-y-2'>
//             <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Values :'}</p>
//             <div className='flex w-option-container flex-col items-end space-y-4 self-stretch'>
//               <div className='w-option-container select-container'>
//                 <Select<Option, true>
//                   instanceId='option-select'
//                   isMulti
//                   options={options}
//                   placeholder='Select field'
//                   onChange={handleOptionChange}
//                   value={typeof tempSelectedOptions !== 'undefined' ? tempSelectedOptions : []}
//                 />
//               </div>
//               {tempSelectedFields.map((fieldWithType) => {
//                 console.log(fieldWithType);
//                 const parts = fieldWithType.split('-');
//                 const field = parts[0];
//                 const type = parts[1] as 'min' | 'max';
//                 const uiField = fields.find((item) => item[0] === field)?.[1][0] || field;
//                 const tooltip = fields.find((item) => item[0] === field)?.[1][1] || '';
//                 return (
//                   <div key={fieldWithType} className='filter-item'>
//                     <div className='flex justify-end space-x-4 self-stretch'>
//                       <Chip
//                         className='text-center p-0 pl-2 pr-2'
//                         variant='ghost'
//                         color='blue-gray'
//                         size='md'
//                         value={
//                           <div className='w-fill flex items-center justify-center gap-[2px]'>
//                             <Tooltip
//                               placement='bottom'
//                               className='border border-blue-gray-50 bg-white px-4 py-3 shadow-md shadow-black/10'
//                               content={
//                                 <div className='w-full'>
//                                   <Typography color='blue-gray' className='font-medium text-[16px]'>
//                                     {uiField}
//                                   </Typography>
//                                   <Typography
//                                     variant='small'
//                                     color='blue-gray'
//                                     className='font-normal text-[12px] opacity-80'
//                                   >
//                                     {tooltip}
//                                   </Typography>
//                                 </div>
//                               }
//                             >
//                               <svg
//                                 xmlns='http://www.w3.org/2000/svg'
//                                 fill='none'
//                                 viewBox='0 0 24 24'
//                                 stroke='currentColor'
//                                 strokeWidth={2}
//                                 className='h-4 w-4 cursor-pointer text-blue-gray-500'
//                               >
//                                 <path
//                                   strokeLinecap='round'
//                                   strokeLinejoin='round'
//                                   d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
//                                 />
//                               </svg>
//                             </Tooltip>
//                             <p className='w-[82px] text-[12px] font-normal leading-6 tracking-tight truncate'>
//                               {uiField} ({type === 'min' ? 'Min' : 'Max'})
//                             </p>
//                           </div>
//                         }
//                       />
//                       <div className='flex w-select-option justify-end items-center space-x-2 self-stretch relative'>
//                         <button
//                           type='button'
//                           className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
//                           onClick={() => adjustValue(field, type, false)}
//                         >
//                           <span className='m-auto'>-</span>
//                         </button>
//                         <div className='bg-transparent w-10 text-xs md:text-base flex items-center justify-center cursor-default'>
//                           <input
//                             type='number'
//                             className='bg-transparent w-full text-xs md:text-base text-center flex items-center justify-center cursor-text'
//                             value={tempFilters[field]?.[type] || ''}
//                             onChange={(e) => handleInputChange(field, type, e.target.value)}
//                             min={0}
//                             placeholder='-'
//                           />
//                         </div>
//                         <button
//                           type='button'
//                           className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
//                           onClick={() => adjustValue(field, type, true)}
//                         >
//                           <span className='m-auto'>+</span>
//                         </button>
//                       </div>
//                       <Button
//                         onClick={() => handleDeleteField(fieldWithType)}
//                         className='cursor-pointer w-[83px] h-[32px] shadow-none bg-gradient-to-t from-[#BF1616] to-[#AE0F0F] flex items-center justify-center hover:brightness-75 text-white rounded-md gap-[6px]'
//                         variant='text'
//                         ripple={false}
//                       >
//                         {/* <Image src='/del.svg' width={83} height={32} alt='삭제버튼' /> */}
//                         <Image src='/minus.svg' width={24} height={24} alt='삭제버튼' />
//                         <p className='font-sans text-sm font-medium'>{'DEL'}</p>
//                       </Button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//           <Button
//             onClick={handleSearch}
//             className='mt-8 cursor-pointer w-[98px] h-[36px] shadow-none bg-pri-color flex items-center justify-center hover:brightness-75 text-white rounded-md'
//             variant='text'
//             ripple={false}
//           >
//             <p className='font-sans text-sm font-normal leading-4 tracking-wider'>{'SEARCH'}</p>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OptionSelect;
