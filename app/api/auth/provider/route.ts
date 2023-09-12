import { getProviders } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  const providers = await getProviders();
  console.log('Providers', providers);
  // res.end()
  return NextResponse.json(providers, {
    status: 200,
  });
}
