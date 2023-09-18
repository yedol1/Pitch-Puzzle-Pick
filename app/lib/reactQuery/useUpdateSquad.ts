import { useMutation } from '@tanstack/react-query';
import { NextResponse } from 'next/server';

const updateSquad = async ({ userId, starting, sub }: { userId: string; starting: string; sub: string }) => {
  const url = new URL('/api/user/squad/update', location.origin);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, starting, sub }),
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

  return data;
};

export function useUpdateSquad() {
  return useMutation<any, Error, { userId: string; starting: string; sub: string }>(updateSquad);
}
