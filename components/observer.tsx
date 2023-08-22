import { RootState } from '@/app/lib/store/filters';
import { IProps } from '@/app/lib/type';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Observer({ handleIntersection }: IProps) {
  console.log('Observer 컴포넌트 마운트!');
  const target = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        console.log('entry:', entry);
        if (entry.isIntersecting) {
          console.log('동작!!');
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
