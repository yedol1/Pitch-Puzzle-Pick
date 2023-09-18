import { Tooltip, Typography } from '@material-tailwind/react';

interface PlayerDetailTooltipProps {
  tit: string;
  sub: string;
}

const PlayerDetailTooltip = ({ tit, sub }: PlayerDetailTooltipProps) => {
  if (!tit || !sub) {
    return null; // tit 혹은 sub 가 없으면 아무것도 렌더링하지 않음.
  }
  return (
    <Tooltip
      placement='bottom'
      className='border border-blue-gray-50 bg-white px-4 py-3 shadow-md shadow-black/10'
      content={
        <div className='w-full'>
          <Typography color='blue-gray' className='font-medium text-[16px]'>
            {tit}
          </Typography>
          <Typography variant='small' color='blue-gray' className='font-normal text-[12px] opacity-80'>
            {sub}
          </Typography>
        </div>
      }
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
        className='h-4 w-4 cursor-pointer text-blue-gray-500 mr-[2px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
        />
      </svg>
    </Tooltip>
  );
};

export default PlayerDetailTooltip;
