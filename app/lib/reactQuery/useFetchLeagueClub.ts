import { useQuery } from '@tanstack/react-query';

const fetchLeaguesClub = async (based: string, nat: string) => {
  const url = new URL(`/api/league/club`, location.origin);
  if (nat !== '') {
    url.searchParams.append('LeagueNat', nat);
    if (based !== '') {
      url.searchParams.append('Based', based);
    }
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchLeagueClub(based: string, nat: string) {
  const queryResult = useQuery<any>(['leaguesClub', based], () => fetchLeaguesClub(based, nat));

  return queryResult;
}
