'use client';

import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { poppins } from '@/app/lib/font';
import path from 'path';

const NavigationBar = () => {
  const pathname = usePathname();
  const param = useParams();

  let homeNavStyle = '';
  let squadNavStyle = '';
  let communityNavStyle = '';
  switch (pathname) {
    case '/':
    case `/player/${param.UID}`:
      homeNavStyle = 'border-b-2';
      break;
    case '/squad':
    case `/squad/player/${param.UID}`:
      squadNavStyle = 'border-b-2';
      break;
    case '/community':
      communityNavStyle = 'border-b-2';
      break;
    default:
      break;
  }

  return (
    <nav
      className={`${poppins.className} fixed top-0 flex w-screen py-2 px-20 justify-center items-center bg-transparent text-white backdrop-blur-sm`}
    >
      <div className='flex flex-row w-full justify-between items-center '>
        {/* 로고 */}
        <div className='flex flex-row justify-center items-center'>
          <Image src='/logo.svg' width={86} height={86} alt='로고 이미지' />
          <h1 className='sr-only'>Pitch Puzzle Pick</h1>
        </div>

        {/* 링크들 */}
        <div className='hidden customNav:flex flex-row h-86 gap-10 justify-center items-center'>
          <Link href='/' className={`flex items-center h-86 ${homeNavStyle}`}>
            <p>Home</p>
          </Link>
          <Link href='/squad' className={`flex items-center h-86 ${squadNavStyle}`}>
            <p>Team Squad</p>
          </Link>
          <Link href='/community' className={`flex items-center h-86 ${communityNavStyle}`}>
            <p>Community</p>
          </Link>
        </div>

        {/* 로그인 */}
        <div className='flex flex-row justify-center items-center'>
          <Link href='#' className='flex flex-row justify-center items-center gap-1.5'>
            <Image src='/user.svg' width={16} height={16} alt='로그인/로그아웃 이미지' />
            <p>Login</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
