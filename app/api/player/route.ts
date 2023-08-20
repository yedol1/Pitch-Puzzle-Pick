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
  const column = url.searchParams.get('column');
  const order = url.searchParams.get('order');
  if (column === 'CA' && order === 'desc') {
    const users = await client.playerInfo.findMany({
      take: 20,
      orderBy: {
        CA: 'desc',
      },
    });

    return NextResponse.json(users);
  }
  if (column === 'CA' && order === 'asc') {
    const users = await client.playerInfo.findMany({
      take: 20,
      orderBy: {
        CA: 'asc',
      },
    });

    return NextResponse.json(users);
  }
}
