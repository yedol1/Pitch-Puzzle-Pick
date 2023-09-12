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
  swapStartingPositions,
  swapSubToStartingPosition,
} from '../lib/store/selectedSquad';
import { useFetchSquadPlayers } from '../lib/reactQuery/useFetchSquadPlayers';

const Home = () => {
  const dispatch = useDispatch();
  const squad = useSelector((state: RootState) => state.squad);
  console.log(squad);
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log(result);
    // If no destination, return
    if (!destination) return;

    // If source and destination are the same, return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Starting position to starting position (swap players between positions)
    if (
      squad.starting.some((pos: any) => pos.position === source.droppableId) &&
      squad.starting.some((pos: any) => pos.position === destination.droppableId)
    ) {
      const sourcePosition = squad.starting.find((pos: any) => pos.position === source.droppableId);
      const destPosition = squad.starting.find((pos: any) => pos.position === destination.droppableId);
      dispatch(swapStartingPositions(sourcePosition, destPosition));
    }
    // Starting position to sub
    else if (
      squad.starting.some((pos: any) => pos.position === source.droppableId) &&
      destination.droppableId === 'sub'
    ) {
      console.log(source.droppableId, destination.index);
      dispatch(moveStartingToSub(Number(result.draggableId), destination.index, source.droppableId));
    }
    // Sub to starting position
    else if (
      source.droppableId === 'sub' &&
      squad.starting.some((pos: any) => pos.position === destination.droppableId)
    ) {
      console.log('접근');
      const destPosition = squad.starting.find((pos: any) => pos.position === destination.droppableId);
      console.log(destPosition);
      if (destPosition.player) {
        // if player exists in the position, swap
        dispatch(swapSubToStartingPosition(source.index, destPosition));
      } else {
        console.log('접근2');
        // if no player in the position, just set
        dispatch(moveSubToStarting(Number(result.draggableId), source.index, destPosition.position));
      }
    }
    // Sub to sub
    else if (source.droppableId === 'sub' && destination.droppableId === 'sub') {
      dispatch(rearrangeSub(source.index, destination.index));
    }
  };

  const squadPlayersData = useFetchSquadPlayers(squad);
  return (
    <main className='w-fit-content flex flex-col justify-center items-center mt-[110px]'>
      {squadPlayersData && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='GK'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='GK bg-red-500 p-[10px] w-[200px]'>
                {squad.starting.map((pos: any) => {
                  if (pos.position === 'GK') {
                    return (
                      <Draggable key={`GK-${pos.player}`} draggableId={String(pos.player)} index={0}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            {/* GK player rendering */}
                            {pos.player}
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId='LCB'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='LCB bg-cyan-500 p-[10px] w-[200px]'>
                {squad.starting.map((pos: any) => {
                  if (pos.position === 'LCB') {
                    return (
                      <Draggable key={`LCB-${pos.player}`} draggableId={String(pos.player)} index={0}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            {/* LCB player rendering */}
                            {pos.player}
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* For substitute players */}
          <Droppable droppableId='sub'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='sub bg-blue-500 p-[10px] w-[200px]'>
                {squad.sub.map((UID: number, index: number) => (
                  <Draggable key={UID} draggableId={String(UID)} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {/* Render player data here */}
                        {
                          // squadPlayersData 를 순회하면서 UID 와 일치하는 데이터를 찾아서 렌더링
                          squadPlayersData?.map((player) => {
                            if (player?.data?.UID === UID) {
                              return (
                                <>
                                  <div key={`Name-${player.data.UID}`}>{player.data.Name}</div>
                                  <div key={`DetailedPos-${player.data.UID}`}>{player.data.DetailedPos}</div>
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
            )}
          </Droppable>
        </DragDropContext>
      )}

      <OptionSelect />
      <Table isDisabled={false} />
      <div className='h-[20px]'></div>
    </main>
  );
};

export default Home;
