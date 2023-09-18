'use client';
import Table from '@/components/table';
import OptionSelect from '@/components/optionSelect';
import { RootState } from '../lib/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import {
  moveStartingToSub,
  moveSubToStarting,
  rearrangeSub,
  setSquad,
  resetSquad,
  swapStartingPositions,
  swapSubToStartingPosition,
  removeSubField,
  removeStartingField,
} from '../lib/store/selectedSquad';
import { useFetchSquadPlayers } from '../lib/reactQuery/useFetchSquadPlayers';
import Image from 'next/image';
import DragComponent from './component/dragComponent';
import { useFetchUserSquad } from '../lib/reactQuery/useFetchUserSquad';
import { useSession } from 'next-auth/react';
import { useFetchUser } from '../lib/reactQuery/useFetchUser';
import { useUpdateSquad } from '../lib/reactQuery/useUpdateSquad';
import { Suspense, useEffect, useState } from 'react';
import { StrictModeDroppable } from './component/strictModeDroppable';
import Loading from './loading';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

const Home = () => {
  const { data: session } = useSession();
  const { data: userData, isLoading } = useFetchUser(session?.user?.email, session?.provider?.toUpperCase() || '');
  const { data: squadData, refetch } = useFetchUserSquad(userData);
  const squad = useSelector((state: RootState) => state.squad);
  const squadPlayersData = useFetchSquadPlayers(squad);
  const mutation = useUpdateSquad();
  const dispatch = useDispatch();

  // 첫페이지 로딩시, 로그인이 되어있으면, 유저의 스쿼드를 불러옴
  // -> 분기처리가 어려움
  // useEffect(() => {
  //   if (squadData && session) {
  //     dispatch(setSquad(squadData.startingPlayerUids, squadData.subPlayerUids));
  //   }
  // }, [session]);

  const onDragEnd = (result: any) => {
    if (!squad) return;
    const { source, destination, draggableId, reason } = result;
    const startingNumber = squad.starting.filter((playerObj: any) => playerObj.player !== null).length;
    // sub 에서 동작하면, 그냥 UID 만
    // starting 에서 동작하면, UID 와 position 을 같이 포함함
    const splitResult = draggableId.split('-');

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (
      squad.starting.some((pos: any) => pos.position === source.droppableId) &&
      squad.starting.some((pos: any) => pos.position === destination.droppableId)
    ) {
      // starting 에서 starting 으로 이동
      const sourcePosition = squad.starting.find((pos: any) => pos.position === source.droppableId);
      const destPosition = squad.starting.find((pos: any) => pos.position === destination.droppableId);
      dispatch(swapStartingPositions(sourcePosition, destPosition));
    } else if (
      squad.starting.some((pos: any) => pos.position === source.droppableId) &&
      destination.droppableId === 'sub'
    ) {
      // starting 에서 sub 으로 이동
      dispatch(moveStartingToSub(Number(splitResult[1]), destination.index, source.droppableId));
    } else if (
      source.droppableId === 'sub' &&
      squad.starting.some((pos: any) => pos.position === destination.droppableId)
    ) {
      // sub 에서 starting 으로 이동
      const destPosition = squad.starting.find((pos: any) => pos.position === destination.droppableId);
      if (destPosition.player) {
        dispatch(swapSubToStartingPosition(source.index, destPosition));
      } else {
        if (startingNumber < 11) {
          dispatch(moveSubToStarting(Number(splitResult[0]), source.index, destPosition.position));
        } else {
          alert('선발 선수는 최대 11명입니다.');
        }
      }
    } else if (source.droppableId === 'sub' && destination.droppableId === 'sub') {
      // sub 에서 sub 으로 이동
      dispatch(rearrangeSub(source.index, destination.index));
    } else if (source.droppableId === 'sub' && destination.droppableId === 'remove') {
      // 선택된 sub 제거
      dispatch(removeSubField(Number(draggableId)));
    } else if (
      squad.starting.some((pos: any) => pos.position === source.droppableId) &&
      destination.droppableId === 'remove'
    ) {
      // 선택된 starting 제거
      dispatch(removeStartingField(source.droppableId));
    }
  };
  const startingToString = (squad: any) => {
    return squad.starting
      .filter((s: any) => s.player !== null)
      .map((s: any) => `${s.position}:${s.player}`)
      .join(',');
  };
  const subToString = (squad: any) => {
    return squad.sub.join(',');
  };
  const handleSetSquad = (squadData: any) => {
    if (userData) {
      if (squadData) {
        dispatch(setSquad(squadData.startingPlayerUids, squadData.subPlayerUids));
        alert('저장된 스쿼드를 불러왔습니다.');
      } else {
        alert('저장된 스쿼드가 없습니다.');
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };
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
    } else {
      alert('로그인이 필요합니다.');
    }
  };
  return (
    <main className='font-montserrat w-fit-content flex flex-col justify-center items-center mt-[110px]'>
      <div className='inline-flex	flex-col justify-center items-center gap-[24px] mb-[40px]'>
        <h1 className='text-white text-[48px] font-semibold'>Squad Builder</h1>
        <div className='flex justify-center items-center gap-[8px]'>
          <Button
            className='bg-[#5271FF] hover:bg-opacity-80'
            onClick={() => handleUpdateSquad(userData, startingToString(squad), subToString(squad))}
          >
            save
          </Button>
          <Button className='bg-[#6B6B6D] hover:bg-opacity-80' onClick={() => handleSetSquad(squadData)}>
            load
          </Button>
          <Button className='bg-[#AF1010] hover:bg-opacity-80' onClick={() => handleResetSquad()}>
            reset
          </Button>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <div className='flex flex-col justify-center items-center'>
          {squadPlayersData && (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className='inline-flex justify-center items-start content-start gap-[34px] flex-wrap mb-[40px]'>
                <div className='w-[500px] h-[800px] grid grid-rows-6 bg-[url("/pitch.svg")]  shadow-custom'>
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
                      className='sub flex w-[458px] h-[800px] px-[40px] flex-col justify-center items-start flex-shrink-0 rounded-[20px] bg-white shadow-custom'
                    >
                      <h2 className='text-[#919191] text-[20px] font-semibold mt-[20px]'>Substitutes List :</h2>
                      <div className='flex w-[378px] h-[740px] items-start content-start gap-y-2 gap-x-[18px] flex-shrink-0 flex-wrap mt-[8px]'>
                        {squad.sub.map((UID: number, index: number) => (
                          <Draggable key={`sub-${UID}`} draggableId={String(UID)} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className='flex w-[378px] h-[44px] items-center gap-2.5 flex-shrink-0 rounded-lg border-2 border-[#A6A6A6]'
                              >
                                <Image
                                  src='/list.svg'
                                  width={10}
                                  height={18}
                                  alt='list 표현 이미지'
                                  className='ml-[8px]'
                                />
                                {/* Render player data here */}
                                {
                                  // squadPlayersData에서 UID와 일치하는 첫 번째 데이터를 찾아서 렌더링
                                  (() => {
                                    const matchedPlayer = squadPlayersData?.find((player) => player?.data?.UID === UID);

                                    if (matchedPlayer) {
                                      return (
                                        <>
                                          <Link
                                            href={`/squad/player/${UID}`}
                                            className='flex flex-row items-center gap-[2px] flex-shrink-0'
                                          >
                                            <p className='w-[180px] flex text-black text-base font-semibold truncate hover:underline cursor-pointer'>
                                              {matchedPlayer.data.Name}
                                            </p>
                                            <p className='flex text-[12px] font-normal text-[#A6A6A6] truncate'>
                                              {matchedPlayer.data.Position}
                                            </p>
                                          </Link>
                                        </>
                                      );
                                    }
                                  })()
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
              </div>
              {/* For Remove players */}
              <StrictModeDroppable droppableId='remove'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='remove relative flex DragWrapper1:w-[992px] DragWrapper2:w-[880px] DragWrapper3:w-[710px] DragWrapper4:w-[610px] w-[440px] h-[80px] justify-center rounded-[20px] bg-transparent border border-[#E2E8F0] border-dashed hover:bg-gray hover:bg-opacity-10'
                  >
                    <Image
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                      src='/trash.svg'
                      width={32}
                      height={40}
                      alt='쓰레기통 이미지'
                    />
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          )}
        </div>
      </Suspense>
      <Suspense fallback={<Loading />}>
        <OptionSelect />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Table isDisabled={false} />
      </Suspense>
      <div className='h-[20px]'></div>
    </main>
  );
};

export default Home;
