'use client';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';

const TableRow = ({ user, isDisabled = false }: any) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <tr key={user.UID} className='flex h-16 rounded-bl-lg rounded-br-lg border-t border-solid border-gray-300'>
      <td className='flex flex-row w-table py-0 pl-6 items-center space-x-1.5 pr-2 '>
        <div
          className={`w-9 h-9 flex-shrink-0 flex items-center text-center rounded-lg 
                ${
                  user.CA < 100
                    ? 'bg-bad'
                    : user.CA < 130
                    ? 'bg-gradient-to-r from-normalA to-normalB'
                    : user.CA < 160
                    ? 'bg-gradient-to-r from-goodA to-goodB'
                    : 'bg-gradient-to-r from-excellentA to-excellentB'
                }`}
        >
          <p className='w-full truncate text-white text-base font-medium tracking-tighter text-center'>
            {Math.ceil(user.CA / 2)}
          </p>
        </div>
      </td>
      <td className='flex w-table py-0 pl-6 items-center space-x-1.5 pr-2'>
        <div
          className={`w-9 h-9 flex-shrink-0 flex items-center text-center rounded-lg 
                ${
                  user.CA < 100
                    ? 'bg-bad'
                    : user.CA < 130
                    ? 'bg-gradient-to-r from-normalA to-normalB'
                    : user.CA < 160
                    ? 'bg-gradient-to-r from-goodA to-goodB'
                    : 'bg-gradient-to-r from-excellentA to-excellentB'
                }`}
        >
          <p className='w-full truncate text-white text-base font-medium tracking-tighter text-center'>
            {Math.ceil(user.PA / 2)}
          </p>
        </div>
      </td>
      <td
        className='flex w-name py-0 pl-6 items-center space-x-1.5 pr-2'
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => !isDisabled && setIsHovered(false)}
      >
        {isHovered ? (
          <Image
            src='/add.svg'
            width={32}
            height={32}
            alt='스쿼드 추가 버튼 이미지'
            onClick={() => console.log('if clicked, add squad')}
            className='cursor-pointer'
          />
        ) : (
          <Image src='/default.svg' width={32} height={32} alt='유저의 가상 이미지' />
        )}
        <Link href={`/player/${user.UID}`}>
          <p className='w-full truncate ml-2 hover:underline cursor-pointer'>{user.Name}</p>
        </Link>
      </td>
      <td className='hidden tableSalary:flex w-170 py-0 pl-6 items-center space-x-1.5 pr-2'>
        <p className='w-full truncate'>{user.Salary}</p>
      </td>
      <td className='hidden tableAP:flex w-table py-0 pl-6 items-center space-x-1.5 pr-2'>
        <p className='w-full truncate'>{user.AP}</p>
      </td>
      <td className='hidden tableDOB:flex w-170 py-0 pl-6 items-center space-x-1.5 pr-2'>
        <p className='w-full truncate'>{user.DOB}</p>
      </td>
    </tr>
  );
};

export default TableRow;
