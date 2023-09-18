import { useQueries } from '@tanstack/react-query';

const fetchSquadPlayers = async (UID: number) => {
  const url = new URL(`/api/player/selectedInfo`, location.origin);
  if (UID > 0 && Number.isInteger(UID)) {
    url.searchParams.append('UID', UID.toString());
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
type PlayerInfo = {
  position: string;
  player: number | null;
};
export function useFetchSquadPlayers(squad: { starting: PlayerInfo[]; sub: number[] }) {
  const validStartingUIDs = squad.starting
    .filter((playerInfo) => playerInfo.player !== null)
    .map((playerInfo) => playerInfo.player as number);

  const allUIDs = [...validStartingUIDs, ...squad.sub];

  const playerQueries = allUIDs.map((UID) => {
    return {
      queryKey: ['selectedPlayer', UID],
      queryFn: () => fetchSquadPlayers(UID),
    };
  });

  const queryResults = useQueries({ queries: playerQueries });

  return queryResults;
}
