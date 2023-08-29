import { useQuery } from '@tanstack/react-query';

const fetchLeaguesBased = async (nat: string) => {
  const url = new URL(`/api/league/based`, location.origin);
  if (nat !== '') {
    url.searchParams.append('LeagueNat', nat);
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchLeagueBased(nat: string) {
  const queryResult = useQuery<any>(['leaguesBased', nat], () => fetchLeaguesBased(nat));

  return queryResult;
}
