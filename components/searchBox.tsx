// 입력하자마자 바로바로 dispatch 되는 필터링 옵션 선택창
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/app/lib/store/filters';
import { RootState } from '@/app/lib/store/reduxType';
import { Input } from '@material-tailwind/react';

const SearchBox = () => {
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);

  const handleNameChange = (value: string) => {
    // 바로바로 dispatch
    const updatedFilters = { ...actualFilters, Name: { value } };
    dispatch(setFilters(updatedFilters));
  };

  return (
    <>
      <Input
        id='NameFilter'
        size='md'
        color='blue'
        label='Input Name'
        type='text'
        className='bg-white'
        value={actualFilters.Name.value || ''}
        onChange={(e) => handleNameChange(e.target.value)}
      />
    </>
  );
};

export default SearchBox;
