import { FetchPlayersArgs, PlayerInfoType, HeaderType, OrderType } from '@/app/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FilterableFieldsParmas, BelongFields } from '../constans';

const fetchPlayers = async ({ pageParam = undefined, selectedHeader, order, filters }: FetchPlayersArgs) => {
  // URL 기본 구조
  const url = new URL(`/api/player`, location.origin);

  // 파라미터 추가
  url.searchParams.append('column', selectedHeader);
  url.searchParams.append('order', order);
  if (pageParam) {
    url.searchParams.append('UID', pageParam.toString());
  }

  FilterableFieldsParmas.forEach((field) => {
    if (filters[field]) {
      if (filters[field].min) {
        url.searchParams.append(`${field}_min`, filters[field].min.toString());
      }
      if (filters[field].max) {
        url.searchParams.append(`${field}_max`, filters[field].max.toString());
      }
      if (filters[field].value) {
        url.searchParams.append(`${field}_value`, filters[field].value);
      }
    }
  });
  BelongFields.forEach((field) => {
    if (filters.Belong[field] && filters.Belong[field].value !== '') {
      url.searchParams.append(`${field}_value`, filters.Belong[field].value);
    }
  });
  // DetailedPos 처리
  if (filters.DetailedPos) {
    filters.DetailedPos.forEach((pos: string) => {
      url.searchParams.append('DetailedPos', pos);
    });
  }

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
    async ({ pageParam }) => {
      const data = await fetchPlayers({ pageParam, selectedHeader, order, filters });
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length < 11) {
          return undefined; // 11개 미만의 데이터가 있다면, 다음 페이지가 없다고 설정
        }
        return lastPage[lastPage.length - 1]?.UID; // 그렇지 않다면, 다음 페이지의 UID를 반환
      },
    },
  );
  return queryResult;
}
