import { FetchPlayersArgs, PlayerInfoType, HeaderType, OrderType } from '@/app/lib/type';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchPlayers = async ({ pageParam = undefined, selectedHeader, order }: FetchPlayersArgs) => {
  const url = `/api/player?column=${selectedHeader}&order=${order}&UID=${pageParam}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useFetchPlayers(selectedHeader: HeaderType, order: OrderType) {
  const queryResult = useInfiniteQuery<PlayerInfoType[]>(
    ['players', selectedHeader, order],
    ({ pageParam }) => fetchPlayers({ pageParam, selectedHeader, order }),
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.UID,
    },
  );

  return queryResult;
}
