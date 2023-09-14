'use client';
import Table from '@/components/table';
import OptionSelect from '@/components/optionSelect';
import { RootState } from '../lib/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  moveStartingToSub,
  moveSubToStarting,
  rearrangeStarting,
  rearrangeSub,
  setSquad,
  resetSquad,
  swapStartingPositions,
  swapSubToStartingPosition,
} from '../lib/store/selectedSquad';
import { useFetchSquadPlayers } from '../lib/reactQuery/useFetchSquadPlayers';
import Image from 'next/image';
import { onErrorDefaultPlayerImg } from '../lib/hook';
import DragComponent from './component/dragComponent';
import { useFetchUserSquad } from '../lib/reactQuery/useFetchUserSquad';
import { useSession } from 'next-auth/react';
import { useFetchUser } from '../lib/reactQuery/useFetchUser';
import { useUpdateSquad } from '../lib/reactQuery/useUpdateSquad';
import { useEffect, useState } from 'react';
import { StrictModeDroppable } from './component/strictModeDroppable';
import { Tooltip, Typography } from '@material-tailwind/react';

const Home = () => {
  const { data: session } = useSession();
  const { data: userData, isLoading } = useFetchUser(session?.user?.email, session?.provider?.toUpperCase() || '');
  const { data: squadData, refetch } = useFetchUserSquad(userData);
  const squad = useSelector((state: RootState) => state.squad);
  const squadPlayersData = useFetchSquadPlayers(squad);
  const mutation = useUpdateSquad();
  const dispatch = useDispatch();
  console.log(squad);

  useEffect(() => {
    if (squadData) {
      dispatch(setSquad(squadData.startingPlayerUids, squadData.subPlayerUids));
    }
  }, [squadData]);

  const onDragEnd = (result: any) => {
    if (!squad) return;
    const { source, destination } = result;
    console.log('결과:', result);
    const startingNumber = squad.starting.filter((playerObj: any) => playerObj.player !== null).length;
    const splitResult = result.draggableId.split('-');
    console.log(startingNumber);
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (
      squad.starting.some((pos: any) => pos.position === source.droppableId) &&
      squad.starting.some((pos: any) => pos.position === destination.droppableId)
    ) {
      const sourcePosition = squad.starting.find((pos: any) => pos.position === source.droppableId);
      const destPosition = squad.starting.find((pos: any) => pos.position === destination.droppableId);
      dispatch(swapStartingPositions(sourcePosition, destPosition));
    } else if (
      squad.starting.some((pos: any) => pos.position === source.droppableId) &&
      destination.droppableId === 'sub'
    ) {
      dispatch(moveStartingToSub(Number(splitResult[1]), destination.index, source.droppableId));
    } else if (
      source.droppableId === 'sub' &&
      squad.starting.some((pos: any) => pos.position === destination.droppableId)
    ) {
      const destPosition = squad.starting.find((pos: any) => pos.position === destination.droppableId);
      if (destPosition.player) {
        dispatch(swapSubToStartingPosition(source.index, destPosition));
      } else {
        if (startingNumber < 11) {
          dispatch(moveSubToStarting(Number(splitResult[1]), source.index, destPosition.position));
        } else {
          alert('선발 선수는 최대 11명입니다.');
        }
      }
    } else if (source.droppableId === 'sub' && destination.droppableId === 'sub') {
      dispatch(rearrangeSub(source.index, destination.index));
    }
  };
  const startingToString = (squad: any) => {
    return squad.starting
      .filter((s: any) => s.player !== null)
      .map((s: any) => `${s.position}:${s.player}`)
      .join(',');
  };
  console.log(startingToString(squad));
  const subToString = (squad: any) => {
    return squad.sub.join(',');
  };
  const handleSetSquad = (squadData: any) => {
    dispatch(setSquad(squadData.startingPlayerUids, squadData.subPlayerUids));
    alert('저장된 스쿼드를 불러왔습니다.');
  };
  console.log(squadData);
  const handleResetSquad = () => {
    dispatch(resetSquad());
  };
  const handleUpdateSquad = (userId: string, starting: string, sub: string) => {
    if (userData) {
      mutation.mutate(
        {
          userId: userId,
          starting: starting,
          sub: sub,
        },
        {
          onSuccess: () => {
            refetch();
            alert('스쿼드가 저장되었습니다.');
          },
        },
      );
    }
  };
  return (
    <main className='w-fit-content flex flex-col justify-center items-center mt-[110px]'>
      <button onClick={() => handleUpdateSquad(userData, startingToString(squad), subToString(squad))}>클릭</button>
      <button onClick={() => handleResetSquad()}>reset</button>
      <button onClick={() => handleSetSquad(squadData)}>저장된 스쿼드</button>
      <div className='inline-flex justify-center items-start content-start gap-[34px] flex-wrap'>
        {squadPlayersData && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className='w-[564px] h-[902px] grid grid-rows-6 bg-[url("/pitch.svg")]  shadow-custom'>
              <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                <DragComponent position='STC' />
              </div>
              <div className='grid grid-cols-5'>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='AML' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='AMCL' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='AMC' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='AMCR' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='AMR' />
                </div>
              </div>
              <div className='grid grid-cols-5'>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='ML' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='LCM' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='CM' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='RCM' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='MR' />
                </div>
              </div>
              <div className='grid grid-cols-5'>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='WBL' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='LDM' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='CDM' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='RDM' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='WBR' />
                </div>
              </div>
              <div className='grid grid-cols-5'>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='DL' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='LCB' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='CB' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='RCB' />
                </div>
                <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                  <DragComponent position='DR' />
                </div>
              </div>
              <div className='flex align-middle items-center justify-center hover:bg-black hover:bg-opacity-10'>
                <DragComponent position='GK' />
              </div>
            </div>
            {/* For substitute players */}
            <StrictModeDroppable droppableId='sub'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='sub flex w-[458px] h-[902px] p-[37px] px-[40px] flex-col justify-center items-start gap-[24px] flex-shrink-0 rounded-[20px] bg-white shadow-custom'
                >
                  <h2 className='text-[#919191] text-[40px] font-semibold'>Substitutes List</h2>
                  <div className='flex w-[378px] h-[752px] items-start content-start gap-y-2 gap-x-[18px] flex-shrink-0 flex-wrap'>
                    {squad.sub.map((UID: number, index: number) => (
                      <Draggable key={UID} draggableId={String(UID)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='flex w-[378px] h-[44px] items-center gap-2.5 flex-shrink-0 rounded-lg border-2 border-[#A6A6A6]'
                          >
                            <Image src='/list.svg' width={10} height={18} alt='list 표현 이미지' className='ml-[8px]' />
                            {/* Render player data here */}
                            {
                              // squadPlayersData 를 순회하면서 UID 와 일치하는 데이터를 찾아서 렌더링
                              squadPlayersData?.map((player) => {
                                if (player?.data?.UID === UID) {
                                  return (
                                    <>
                                      <div className='flex flex-row items-center gap-[2px] flex-shrink-0'>
                                        <p className='w-[180px] text-black text-base font-semibold truncate'>
                                          {player.data.Name}
                                        </p>
                                        <p className='text-[12px] font-normal text-[#A6A6A6] truncate'>
                                          {player.data.Position}
                                        </p>
                                      </div>
                                    </>
                                  );
                                }
                              })
                            }
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        )}
      </div>

      <OptionSelect />
      <Table isDisabled={false} />
      <div className='h-[20px]'></div>
    </main>
  );
};

export default Home;
