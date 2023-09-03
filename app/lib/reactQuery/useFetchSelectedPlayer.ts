import { useQuery } from '@tanstack/react-query';

const fetchSelectedPlayer = async (UID: number) => {
  const url = new URL(`/api/player/selected`, location.origin);
  if (UID > 0 && Number.isInteger(UID)) {
    url.searchParams.append('UID', UID.toString());
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchSelectedPlayer(UID: number) {
  const queryResult = useQuery<any>(['selectedPlayer', UID], () => fetchSelectedPlayer(UID));

  return queryResult;
}
