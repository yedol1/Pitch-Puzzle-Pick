'use client';
import { formatValue, onErrorDefaultPlayerImg } from '@/app/lib/hook';
import { addSubField } from '@/app/lib/store/selectedSquad';
import { RootState } from '@/app/lib/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyImage from './customImage';
const playerURL = process.env.NEXT_PUBLIC_PLAYERS_URL;
const TableRow = ({ user, isDisabled = false }: { user: any; isDisabled: boolean }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const dispatch = useDispatch();
  const squad = useSelector((state: RootState) => state.squad);
  const handleAddSquad = (uid: any) => {
    const totalPlayers = squad.sub.length;

    if (totalPlayers >= 14) {
      alert('Sub 명단에 더 이상 선수를 추가할 수 없습니다.');
      return;
    }

    dispatch(addSubField(uid));
  };
  type PlayerInfo = {
    position: string;
    player: number | null;
  };
  const isUIDInSquad = (uid: any) => {
    const validStartingUIDs = squad.starting
      .filter((playerInfo: PlayerInfo) => playerInfo.player !== null)
      .map((playerInfo: PlayerInfo) => playerInfo.player);

    const allUIDs = [...validStartingUIDs, ...squad.sub];
    return allUIDs.includes(uid);
  };
  const isInSquad = isUIDInSquad(user.UID);
  return (
    <tr
      className={`flex h-16 border-t border-solid border-gray-300 ${
        !isDisabled && isInSquad ? 'bg-opacity-10 bg-black' : 'bg-white'
      }`}
    >
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
          {user.UID !== 0 ? (
            <p className='w-full truncate text-white text-base font-medium tracking-tighter text-center'>
              {Math.ceil(user.CA / 2)}
            </p>
          ) : (
            <p className='w-full truncate text-white text-base font-medium tracking-tighter text-center'>{0}</p>
          )}
        </div>
      </td>
      <td className='flex w-table py-0 pl-6 items-center space-x-1.5 pr-2'>
        <div
          className={`w-9 h-9 flex-shrink-0 flex items-center text-center rounded-lg 
                ${
                  user.PA < 100
                    ? 'bg-bad'
                    : user.PA < 130
                    ? 'bg-gradient-to-r from-normalA to-normalB'
                    : user.PA < 160
                    ? 'bg-gradient-to-r from-goodA to-goodB'
                    : 'bg-gradient-to-r from-excellentA to-excellentB'
                }`}
        >
          {user.UID !== 0 ? (
            <p className='w-full truncate text-white text-base font-medium tracking-tighter text-center'>
              {Math.ceil(user.PA / 2)}
            </p>
          ) : (
            <p className='w-full truncate text-white text-base font-medium tracking-tighter text-center'>{0}</p>
          )}
        </div>
      </td>
      <td
        className='flex w-name py-0 pl-6 items-center space-x-1.5 pr-2'
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => !isDisabled && setIsHovered(false)}
      >
        {isHovered && !isUIDInSquad(user.UID) ? (
          <button onClick={() => handleAddSquad(user.UID)}>
            <Image src='/add.svg' width={32} height={32} alt='스쿼드 추가 버튼 이미지' className='cursor-pointer' />
          </button>
        ) : (
          <MyImage
            src={`${playerURL}/${user.UID}.png`}
            width={32}
            height={32}
            alt='유저의 이미지'
            fallbackSrc='/default.svg'
            onError={(e: any) => onErrorDefaultPlayerImg(e)}
          />
        )}
        {user.UID !== 0 ? (
          isDisabled === true ? (
            <Link href={`/player/${String(user.UID)}`} className='hover:underline cursor-pointer'>
              <p className='w-full truncate ml-2'>{user.Name}</p>
              <p className='w-full truncate ml-2 text-[8px] mt-[4px] text-stone-300'>{user.Position}</p>
            </Link>
          ) : (
            <Link href={`/squad/player/${String(user.UID)}`} className='hover:underline cursor-pointer'>
              <p className='w-full truncate ml-2'>{user.Name}</p>
              <p className='w-full truncate ml-2 text-[8px] mt-[4px] text-stone-300'>{user.Position}</p>
            </Link>
          )
        ) : (
          <p className='w-full truncate ml-2 hover:underline cursor-pointer'>선수정보가 없습니다.</p>
        )}
      </td>
      <td className='hidden tableSalary:flex w-170 py-0 pl-6 items-center space-x-1.5 pr-2'>
        {user.UID !== 0 ? (
          <p className='w-full truncate'>{'주급 ' + formatValue(user.Salary) + ' 유로'}</p>
        ) : (
          <p className='w-full truncate'>{'--'}</p>
        )}
      </td>
      <td className='hidden tableAP:flex w-table py-0 pl-6 items-center space-x-1.5 pr-2'>
        {user.UID !== 0 ? (
          <p className='w-full truncate'>{formatValue(user.AP) + ' 유로'}</p>
        ) : (
          <p className='w-full truncate'>{'--'}</p>
        )}
      </td>
      <td className='hidden tableDOB:flex w-170 py-0 pl-6 items-center space-x-1.5 pr-2'>
        {user.UID !== 0 ? <p className='w-full truncate'>{user.DOB}</p> : <p className='w-full truncate'>{'--'}</p>}
      </td>
    </tr>
  );
};

export default TableRow;
