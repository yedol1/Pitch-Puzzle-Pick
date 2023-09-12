import { Alert } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

const Icon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
      <path
        fillRule='evenodd'
        d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const SuccessAlertStyles = ({ tit }: { tit: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;
  return (
    <div className='fixed Wrapper1:w-[880px] Wrapper2:w-[710px] Wrapper3:w-[610px] w-[440px] bottom-[8px] left-[50%] transform -translate-x-[50%] flex items-center justify-center z-50'>
      <Alert
        icon={<Icon />}
        className='rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]'
      >
        {tit}
      </Alert>
    </div>
  );
};

export default SuccessAlertStyles;
