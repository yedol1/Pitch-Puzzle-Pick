import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

const LoginModal = () => {
  return createPortal(
    <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10'>
      <div className='flex w-[728px] h-[344px] p-[48px 72px] justify-center items-center content-center gap-[56px] flex-shrink-0 flex-wrap rounded-[8px] bg-[#B1D0ED]'>
        <div className='flex flex-col items-center gap-[16px] flex-[1 0 0]'>
          <Image src='/logo.svg' width={208} height={208} alt='logo' />
        </div>
        <div className='flex flex-col justify-center items-center gap-[10px] flex-[1 0 0]'>
          <button onClick={() => signIn('google')}>
            <Image className='hover:opacity-70' src='/login-google.svg' width={208} height={104} alt='login' />
          </button>
          <button onClick={() => signIn('facebook')}>
            <Image className='hover:opacity-70' src='/login-facebook.svg' width={208} height={104} alt='login' />
          </button>
          <button onClick={() => signIn('naver')}>
            <Image className='hover:opacity-70' src='/login-naver.svg' width={208} height={104} alt='login' />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default LoginModal;
