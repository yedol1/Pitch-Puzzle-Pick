'use client';
import { RootState } from '@/app/lib/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useFetchSquadPlayers } from '@/app/lib/reactQuery/useFetchSquadPlayers';
import Image from 'next/image';
import { onErrorDefaultPlayerImg } from '@/app/lib/hook';
import { Tooltip, Typography } from '@material-tailwind/react';
import { StrictModeDroppable } from './strictModeDroppable';

const DragComponent = ({ position }: { position: string }) => {
  const squad = useSelector((state: RootState) => state.squad);
  const squadPlayersData = useFetchSquadPlayers(squad);
  const squadPos = position;
  let squadPosStyle = '';
  let squadPosName = '';
  switch (squadPos) {
    case 'GK':
      squadPosName = 'GK';
      squadPosStyle = 'bg-yellow-600';
      break;
    case 'CB':
    case 'LCB':
    case 'RCB':
      squadPosName = 'DF';
      squadPosStyle = 'bg-green-700';
      break;
    case 'DR':
    case 'DL':
      squadPosName = 'FB';
      squadPosStyle = 'bg-green-700';
      break;
    case 'WBL':
    case 'WBR':
      squadPosName = 'WB';
      squadPosStyle = 'bg-green-700';
      break;
    case 'CDM':
    case 'LDM':
    case 'RDM':
      squadPosName = 'DM';
      squadPosStyle = 'bg-blue-700';
      break;
    case 'ML':
    case 'MR':
      squadPosName = 'W';
      squadPosStyle = 'bg-blue-700';
      break;
    case 'LCM':
    case 'RCM':
    case 'CM':
      squadPosName = 'MF';
      squadPosStyle = 'bg-blue-700';
      break;
    case 'AMCL':
    case 'AMCR':
    case 'AMC':
      squadPosName = 'AM';
      squadPosStyle = 'bg-blue-700';
      break;
    case 'AML':
    case 'AMR':
      squadPosName = 'WF';
      squadPosStyle = 'bg-blue-700';
      break;
    case 'STC':
      squadPosName = 'FW';
      squadPosStyle = 'bg-[#be123c]';
      break;
    default:
      break;
  }
  console.log('hi');
  return (
    <StrictModeDroppable droppableId={squadPos}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${squadPos} active:bg-black active:bg-opacity-30 h-[100px] w-[100px]`}
        >
          {squad.starting.map((pos: any, idx: number) => {
            const playerExists = squadPlayersData?.some((player) => player?.data?.UID === pos?.player);
            if (pos.position === squadPos && playerExists) {
              return (
                <Draggable
                  draggableId={pos.player ? squadPos + '-' + String(pos.player) : 'empty-' + squadPos}
                  index={idx}
                  isDragDisabled={false}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='w-full h-full flex align-middle items-center justify-center'
                    >
                      {
                        // squadPlayersData 를 순회하면서 UID 와 일치하는 데이터를 찾아서 렌더링
                        squadPlayersData?.map((player) => {
                          if (player?.data?.UID === pos?.player) {
                            return (
                              <div className='flex flex-col items-center justify-center relative'>
                                <Tooltip
                                  placement='bottom'
                                  className='border border-blue-gray-50 bg-white px-4 py-3 shadow-md shadow-black/10'
                                  content={
                                    <div className='w-full'>
                                      <Typography color='blue-gray' className='font-medium text-[16px]'>
                                        {player.data.Name}
                                      </Typography>
                                      <Typography
                                        variant='small'
                                        color='blue-gray'
                                        className='font-normal text-[12px] opacity-80'
                                      >
                                        {player.data.DetailedPos}
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
                                    className='h-4 w-4 cursor-pointer text-white mr-[2px] z-10 absolute top-[4px] left-[4px]'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                                    />
                                  </svg>
                                </Tooltip>
                                <Image
                                  src='/[uid].svg'
                                  width={80}
                                  height={80}
                                  alt='유저의 이미지'
                                  onError={(e) => onErrorDefaultPlayerImg(e)}
                                />
                                <div className='flex flex-row w-[100px] grid grid-cols-5'>
                                  <div
                                    className={`col-span-1 h-full ${squadPosStyle} flex items-center justify-center`}
                                  >
                                    <p className='text-[10px] text-white'>{squadPosName}</p>
                                  </div>
                                  <div className='col-span-4 flex items-center justify-center bg-white w-full h-[20px]'>
                                    <p className='pl-[2px] text-xs truncate'>{player.data.Name}</p>
                                  </div>
                                </div>
                                {/* <div key={`DetailedPos-${player.data.UID}`}>{player.data.DetailedPos}</div> */}
                              </div>
                            );
                          }
                        })
                      }
                    </div>
                  )}
                </Draggable>
              );
            }
          })}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default DragComponent;
