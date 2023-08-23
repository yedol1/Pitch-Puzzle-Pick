import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Image from 'next/image';
import { setFilters, addSelectedField, removeSelectedField } from '@/app/lib/store/filters';
import { filterableFields } from '@/app/lib/constans';
import { Filters, RootState } from '@/app/lib/store/reduxType';

// 타입 지정
type Option = {
  value: string;
  label: string;
};

const OptionSelect = () => {
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
  const selectedFields = useSelector((state: RootState) => state.filters.selectedFields);
  const fields = filterableFields;
  const handleFilterChange = (field: string, type: 'min' | 'max', value: string) => {
    const updatedFilters: Filters = {
      ...actualFilters,
      [field]: {
        ...actualFilters[field],
        [type]: Number(value),
      },
    };

    dispatch(setFilters(updatedFilters));
  };
  console.log(actualFilters);
  const handleSelectChange = (selectedOption: Option | null) => {
    if (selectedOption && !selectedFields.includes(selectedOption.value)) {
      dispatch(addSelectedField(selectedOption.value));
    }
  };

  const handleDeleteField = (field: string) => {
    dispatch(removeSelectedField(field));
  };
  const maxPlusOnClicked = (field: string, event: React.MouseEvent) => {
    event.preventDefault();
    const currentMax = actualFilters[field]?.max ?? 0;
    if (currentMax >= 0) {
      handleFilterChange(field, 'max', (currentMax + 1).toString());
    }
  };
  const maxMinusOnClicked = (field: string, event: React.MouseEvent) => {
    event.preventDefault();
    const currentMax = actualFilters[field]?.max ?? 0;
    if (currentMax > 0) {
      handleFilterChange(field, 'max', (currentMax - 1).toString());
    }
  };
  const minPlusOnClicked = (field: string, event: React.MouseEvent) => {
    event.preventDefault();
    const currentMin = actualFilters[field]?.min ?? 0;
    if (currentMin >= 0) {
      handleFilterChange(field, 'min', (currentMin + 1).toString());
    }
  };
  const minMinusOnClicked = (field: string, event: React.MouseEvent) => {
    event.preventDefault();
    const currentMin = actualFilters[field]?.min ?? 0;
    if (currentMin > 0) {
      handleFilterChange(field, 'min', (currentMin - 1).toString());
    }
  };
  const handleInputChange = (field: string, type: 'min' | 'max', value: string) => {
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue >= 0) {
      handleFilterChange(field, type, value);
    }
  };
  return (
    <div className='flex w-option-container flex-col items-start space-y-2'>
      <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Option :'}</p>
      <div className='flex w-option-container flex-col items-end space-y-4 self-stretch'>
        <div className='w-option-container select-container'>
          <Select
            options={fields.map((field) => ({ value: field, label: field }))}
            placeholder='Select max field'
            onChange={handleSelectChange}
          />
        </div>
        {selectedFields.map((field) => (
          <div key={field} className='filter-item'>
            <label className='sr-only'>{field}</label>
            <div className='flex justify-end space-x-4 self-stretch '>
              {/* Min Value */}
              <div className='flex w-select-option justify-end items-center space-x-2 self-stretch relative'>
                <button
                  type='button'
                  className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
                  onClick={(e) => minMinusOnClicked(field, e)}
                >
                  <span className='m-auto'>-</span>
                </button>
                <div className='bg-transparent w-5 text-xs md:text-base flex items-center justify-center cursor-default'>
                  <input
                    type='number'
                    className='bg-transparent w-full text-xs md:text-base text-center flex items-center justify-center cursor-text'
                    value={actualFilters[field]?.min || ''}
                    onChange={(e) => handleInputChange(field, 'min', e.target.value)}
                    min={0}
                  />
                </div>
                <button
                  type='button'
                  className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
                  onClick={(e) => minPlusOnClicked(field, e)}
                >
                  <span className='m-auto'>+</span>
                </button>
              </div>
              <div className='w-9.5 flex items-center justify-center'>
                <p className='text-sm font-normal leading-6 tracking-tight truncate'>{field}</p>
              </div>
              {/* Max Value */}
              <div className='flex w-select-option justify-end items-center space-x-2 self-stretch relative'>
                <button
                  type='button'
                  className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
                  onClick={(e) => maxMinusOnClicked(field, e)}
                >
                  <span className='m-auto'>-</span>
                </button>
                <div className='bg-transparent w-5 text-xs md:text-base flex items-center justify-center cursor-default'>
                  <input
                    type='number'
                    className='bg-transparent w-full text-xs md:text-base text-center flex items-center justify-center cursor-text'
                    value={actualFilters[field]?.max || ''}
                    onChange={(e) => handleInputChange(field, 'max', e.target.value)}
                    min={0}
                  />
                </div>
                <button
                  type='button'
                  className='font-semibold bg-normalA hover:bg-normalB text-white h-7 w-7 flex rounded focus:outline-none cursor-pointer'
                  onClick={(e) => maxPlusOnClicked(field, e)}
                >
                  <span className='m-auto'>+</span>
                </button>
              </div>
              <div onClick={() => handleDeleteField(field)} className='cursor-pointer'>
                <Image src='/del.svg' width={83} height={32} alt='삭제버튼' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionSelect;
