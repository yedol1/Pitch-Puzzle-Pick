// 입력하자마자 바로바로 dispatch 되는 필터링 옵션 선택창
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/app/lib/store/filters';
import { RootState } from '@/app/lib/store/reduxType';
import { Checkbox } from '@material-tailwind/react';

const OptionSelectPos = () => {
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
  console.log(actualFilters);
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
  const isSelectedPos = (pos: string) => {
    if (actualFilters.DetailedPos.find((position: string) => position === pos)) {
      return true;
    }
    return false;
  };
  return (
    <>
      {/* 포지션 선택창 */}
      <div className='flex flex-col w-[360px] items-start space-y-2'>
        <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Position :'}</p>
        <div className='flex flex-col items-start space-y-7 self-stretch'>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='ST'
                color='red'
                onClick={() => handlePosChange('STC')}
                {...(isSelectedPos('STC') ? { defaultChecked: true } : {})}
              />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='AML'
                color='blue'
                onClick={() => handlePosChange('AML')}
                {...(isSelectedPos('AML') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='AMC'
                color='blue'
                onClick={() => handlePosChange('AMC')}
                {...(isSelectedPos('AMC') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='AMR'
                color='blue'
                onClick={() => handlePosChange('AMR')}
                {...(isSelectedPos('AMR') ? { defaultChecked: true } : {})}
              />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='ML'
                color='blue'
                onClick={() => handlePosChange('ML')}
                {...(isSelectedPos('ML') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='MC'
                color='blue'
                onClick={() => handlePosChange('MC')}
                {...(isSelectedPos('MC') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='MR'
                color='blue'
                onClick={() => handlePosChange('MR')}
                {...(isSelectedPos('MR') ? { defaultChecked: true } : {})}
              />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='WBL'
                color='green'
                onClick={() => handlePosChange('WBL')}
                {...(isSelectedPos('WBL') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='DM'
                color='blue'
                onClick={() => handlePosChange('DM')}
                {...(isSelectedPos('DM') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='WBR'
                color='green'
                onClick={() => handlePosChange('WBR')}
                {...(isSelectedPos('WBR') ? { defaultChecked: true } : {})}
              />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='DL'
                color='green'
                onClick={() => handlePosChange('DL')}
                {...(isSelectedPos('DL') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='DC'
                color='green'
                onClick={() => handlePosChange('DC')}
                {...(isSelectedPos('DC') ? { defaultChecked: true } : {})}
              />
            </div>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='DR'
                color='green'
                onClick={() => handlePosChange('DR')}
                {...(isSelectedPos('DR') ? { defaultChecked: true } : {})}
              />
            </div>
          </div>
          <div className='flex justify-center items-start self-stretch'>
            <div className='flex w-[120px] items-center space-x-2'>
              <Checkbox
                label='GK'
                color='green'
                onClick={() => handlePosChange('GK')}
                {...(isSelectedPos('GK') ? { defaultChecked: true } : {})}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionSelectPos;
