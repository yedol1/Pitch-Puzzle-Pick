import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

const client = prisma;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('URL not provided');
  }

  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  const uid = url.searchParams.get('UID') || '';
  const user = await client.playerInfo.findUnique({
    where: {
      UID: Number(uid),
    },
    select: {
      UID: true,
      Name: true,
      Position: true,
      DetailedPos: true,
    },
  });

  return NextResponse.json(user);
}
