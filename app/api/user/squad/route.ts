import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

const client = prisma;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    // return res.status(400).send('URL not provided');
    return NextResponse.json(
      {
        message: 'URL not provided',
      },
      {
        status: 400,
      },
    );
  }
  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);
  const id = url.searchParams.get('id') || '';

  const userSquad = await client.squad.findFirst({
    where: {
      socialUserId: id,
    },
  });
  if (!userSquad) {
    return NextResponse.json(null);
  }

  return NextResponse.json(userSquad);
}
