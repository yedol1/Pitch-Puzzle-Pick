'use client';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className='w-full bg-white p-8 mt-[80px]'>
      <div className='flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between bg-transparent'>
        <Image src='/logo.svg' alt='ppp logo' width={80} height={80} />
        <ul className='flex flex-wrap items-center gap-y-2 gap-x-8'>
          <li>
            <Typography
              as='a'
              href='https://github.com/yedol1'
              target='_blank'
              color='gray'
              className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
            >
              About Me
            </Typography>
          </li>
          <li>
            <Typography
              as='a'
              href='https://velog.io/@yedol1'
              target='_blank'
              color='gray'
              className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
            >
              Blog
            </Typography>
          </li>
          <li>
            <Typography
              as='a'
              href='mailto:yedol1@naver.com'
              target='_blank'
              color='gray'
              className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
            >
              Contact
            </Typography>
          </li>
        </ul>
      </div>
      <hr className='my-8 border-blue-gray-50' />
      <Typography color='gray' className='text-end font-normal'>
        &copy; 2023 Pitch Puzzle Pick
      </Typography>
    </footer>
  );
}
