// Observer.tsx
import React, { useRef } from 'react';

import { Spinner } from '@material-tailwind/react';
import { IProps } from '@/app/type';
import useHandleIntersection from '@/app/lib/useHandleIntersection';

export default function Observer({ handleIntersection }: IProps) {
  const target = useRef(null);
  useHandleIntersection(handleIntersection, target);

  return (
    <div className='flex justify-center pt-5'>
      <Spinner ref={target} color='blue' className='w-[30px] h-[30px]' />
    </div>
  );
}
