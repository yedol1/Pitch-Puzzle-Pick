import { useMutation } from '@tanstack/react-query';
import { NextResponse } from 'next/server';

const createUser = async ({ session, provider }: { session: any; provider: string }) => {
  const url = new URL('/api/user/create', location.origin);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session, provider }),
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Network response was not ok');
    } catch (jsonError) {
      throw new Error('Network response was not ok');
    }
  }
  const data = await response.json();

  return NextResponse.json(data);
};

export function useCreateUser() {
  return useMutation<any, Error, { session: any; provider: string }>(createUser);
}
