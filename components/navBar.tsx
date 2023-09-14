'use client';
import { signOut, useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { poppins } from '@/app/lib/font';
import LoginModal from './loginModal';
import { useEffect, useState } from 'react';
import { useFetchUser } from '@/app/lib/reactQuery/useFetchUser';
import { useCreateUser } from '@/app/lib/reactQuery/useCreateUser';
import { useFetchProviders } from '@/app/lib/reactQuery/useFetchProvider';

const NavigationBar = () => {
  const { data: session } = useSession();
  const {
    data: userData,
    isError: userFetchError,
    isLoading,
  } = useFetchUser(session?.user?.email, session?.provider?.toUpperCase() || '');
  const mutation = useCreateUser();
  const pathname = usePathname();
  const param = useParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  console.log(session);

  useEffect(() => {
    if (session && !userData && !isLoading && session?.provider) {
      mutation.mutate({
        session: session,
        provider: session?.provider?.toUpperCase(),
      });
    }
  }, [session, userData, isLoading]);
  const handleLoginModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowLoginModal(!showLoginModal);
  };
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
      onClick={() => setShowLoginModal(false)}
      className={`${poppins.className} fixed top-0 flex w-screen py-2 px-20 justify-center items-center bg-transparent text-white backdrop-blur-sm z-50`}
    >
      <div className='flex flex-row w-full justify-between items-center '>
        {/* 로고 */}
        <div className='flex flex-row justify-center items-center'>
          <Link href='/'>
            <Image src='/logo.svg' width={86} height={86} alt='로고 이미지' />
          </Link>
          <h1 className='sr-only'>Pitch Puzzle Pick</h1>
        </div>

        {/* 링크들 */}
        <div className='hidden customNav:flex flex-row h-86 gap-10 justify-center items-center'>
          <Link href='/' className={`flex items-center h-86 ${homeNavStyle}`}>
            <p>Search</p>
          </Link>
          <Link href='/squad' className={`flex items-center h-86 ${squadNavStyle}`}>
            <p>Team Squad</p>
          </Link>
          {/* <Link href='/community' className={`flex items-center h-86 ${communityNavStyle}`}>
            <p>Community</p>
          </Link> */}
        </div>

        {/* 로그인 */}
        <div className='flex flex-row justify-center items-center'>
          {session ? (
            <button onClick={() => signOut()} className='flex flex-row justify-center items-center gap-1.5'>
              <Image src='/user.svg' width={16} height={16} alt='로그인/로그아웃 이미지' />
              <p>Logout</p>
            </button>
          ) : (
            <button onClick={handleLoginModal} className='flex flex-row justify-center items-center gap-1.5'>
              <Image src='/user.svg' width={16} height={16} alt='로그인/로그아웃 이미지' />
              <p>Login</p>
            </button>
          )}
          {showLoginModal ? <LoginModal /> : null}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
