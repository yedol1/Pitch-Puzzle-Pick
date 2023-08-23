import { FetchPlayersArgs, PlayerInfoType, HeaderType, OrderType } from '@/app/lib/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { filterableFields } from '../constans';

const fetchPlayers = async ({ pageParam = undefined, selectedHeader, order, filters }: FetchPlayersArgs) => {
  // URL 기본 구조
  const url = new URL(`/api/player`, location.origin);

  // 파라미터 추가
  url.searchParams.append('column', selectedHeader);
  url.searchParams.append('order', order);
  if (pageParam) {
    url.searchParams.append('UID', pageParam.toString());
  }

  filterableFields.forEach((field) => {
    if (filters[field]) {
      if (filters[field].min) {
        url.searchParams.append(`${field}_min`, filters[field].min.toString());
      }
      if (filters[field].max) {
        url.searchParams.append(`${field}_max`, filters[field].max.toString());
      }
    }
  });

  // 나머지 처리
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useFetchPlayers(selectedHeader: HeaderType, order: OrderType, filters?: any) {
  const queryResult = useInfiniteQuery<PlayerInfoType[]>(
    ['players', selectedHeader, order, JSON.stringify(filters)],
    ({ pageParam }) => fetchPlayers({ pageParam, selectedHeader, order, filters }),
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.UID,
    },
  );

  return queryResult;
}
