'use client';
import { IProps } from '@/app/type';
import { Spinner } from '@material-tailwind/react';
import React, { useEffect, useRef } from 'react';

export default function Observer({ handleIntersection }: IProps) {
  const target = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          handleIntersection();
        }
      },
      { threshold: 1 },
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div className='flex justify-center pt-5'>
      <Spinner ref={target} color='blue' className='w-[30px] h-[30px]' />
    </div>
  );
}
