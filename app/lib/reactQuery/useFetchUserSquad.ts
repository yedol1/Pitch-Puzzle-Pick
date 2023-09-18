import { useQuery } from '@tanstack/react-query';

const fetchUserSquad = async (id: any) => {
  const url = new URL(`/api/user/squad?id=${id}`, location.origin);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchUserSquad(id: any) {
  return useQuery<any>(['savedSquad', id], () => fetchUserSquad(id));
}
