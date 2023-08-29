import { useQuery } from '@tanstack/react-query';

const fetchLeaguesBased = async () => {
  const url = new URL(`/api/league`, location.origin);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchLeagueBased() {
  const queryResult = useQuery<any>(['leagues'], () => fetchLeaguesBased());

  return queryResult;
}
