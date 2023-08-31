import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('URL not provided');
  }

  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  const uid = url.searchParams.get('UID') || '';
  const user = await client.playerInfo.findMany({
    where: {
      UID: Number(uid),
    },
    include: {
      status: true,
    },
  });

  return NextResponse.json(user);
}
