import { useQuery } from '@tanstack/react-query';

const fetchUser = async (email: any, provider: string) => {
  const url = new URL(`/api/user?email=${email}&provider=${provider}`, location.origin);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useFetchUser(email: any, provider: string) {
  return useQuery<any>(['user', email, provider], () => fetchUser(email, provider));
}
