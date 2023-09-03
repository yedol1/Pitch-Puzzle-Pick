// 입력하자마자 바로바로 dispatch 되는 필터링 옵션 선택창
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/app/lib/store/filters';
import { RootState } from '@/app/lib/store/reduxType';
import { Checkbox } from '@material-tailwind/react';

const OptionSelectPos = () => {
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);

  const handlePosChange = (value: string) => {
    // Check if the current DetailedPos is an array
    if (Array.isArray(actualFilters['DetailedPos'])) {
      const updatedPositions: string[] = [...actualFilters['DetailedPos']];

      // Check if value exists in the array
      if (updatedPositions.includes(value)) {
        // Remove value from the array
        updatedPositions.splice(updatedPositions.indexOf(value), 1);
      } else {
        // Add value to the array
        updatedPositions.push(value);
      }

      // Update the filters with the new DetailedPos array
      const updatedFilters = {
        ...actualFilters,
        DetailedPos: updatedPositions,
      };

      dispatch(setFilters(updatedFilters));
    }
  };

  return (
    <>
      {/* 포지션 선택창 */}
      <div className='flex flex-col w-[360px] items-start space-y-2'>
        <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Position :'}</p>
        <div className='flex flex-col items-start space-y-7 self-stretch'>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='ST' color='red' onClick={() => handlePosChange('STC')} />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='AML' color='blue' onClick={() => handlePosChange('AML')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='AMC' color='blue' onClick={() => handlePosChange('AMC')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='AMR' color='blue' onClick={() => handlePosChange('AMR')} />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='ML' color='blue' onClick={() => handlePosChange('ML')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='MC' color='blue' onClick={() => handlePosChange('MC')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='MR' color='blue' onClick={() => handlePosChange('MR')} />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='WBL' color='green' onClick={() => handlePosChange('WBL')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='DM' color='blue' onClick={() => handlePosChange('CDM')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='WBR' color='green' onClick={() => handlePosChange('WBR')} />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='DL' color='green' onClick={() => handlePosChange('DL')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='DC' color='green' onClick={() => handlePosChange('DC')} />
            </div>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='DR' color='green' onClick={() => handlePosChange('DR')} />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] justify-center items-center space-x-2'>
              <Checkbox label='GK' color='green' onClick={() => handlePosChange('GK')} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionSelectPos;
