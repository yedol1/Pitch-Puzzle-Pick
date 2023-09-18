'use client';
import { Spinner } from '@material-tailwind/react';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner color='blue' className='w-[30px] h-[30px]' />
    </div>
  );
};

export default Loading;
