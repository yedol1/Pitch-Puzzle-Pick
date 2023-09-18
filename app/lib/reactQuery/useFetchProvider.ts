import { useQuery } from '@tanstack/react-query';

const fetchProviders = async () => {
  const url = new URL(`/api/auth/provider`, location.origin);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
export function useFetchProviders(sessionData: any) {
  return useQuery<any>(['providers', sessionData], () => fetchProviders());
}
