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
  const searchName = url.searchParams.get('search') || '';
  try {
    const user = await client.playerInfo.findMany({
      where: {
        Name: {
          contains: searchName,
        },
      },
      take: 5,
      orderBy: {
        Name: 'asc',
      },
      select: {
        UID: true,
        Name: true,
        Position: true,
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    console.log('Error fetching players:', e);
    return res.status(400).send('Error');
  }
}
