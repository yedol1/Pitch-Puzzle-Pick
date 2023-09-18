import { useQuery } from '@tanstack/react-query';

const fetchSearchPlayers = async (search: string) => {
  const url = new URL(`/api/player/search`, location.origin);
  if (search) {
    url.searchParams.append('search', search);
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchSearchPlayers(search: string) {
  const queryResult = useQuery<any>(['searchPlayers', search], () => fetchSearchPlayers(search));

  return queryResult;
}
