import { IProps } from '@/app/type';
import Image from 'next/image';
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
      <Image ref={target} src='/loading.gif' width={50} height={50} alt='로딩 이미지' />
    </div>
  );
}
