'use client';
import { useParams } from 'next/navigation';
import { useFetchSelectedPlayer } from '../../lib/reactQuery/useFetchSelectedPlayer';

const PlayerDetail = () => {
  // const {data: playerData, error: playerError} = useFetchSelectedPlayer()
  const params = useParams();
  console.log(params);
  return <div>hi</div>;
};

export default PlayerDetail;
