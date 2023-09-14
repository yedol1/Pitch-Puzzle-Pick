import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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

  const userSquad = await prisma.squad.findFirst({
    where: {
      socialUserId: id,
    },
  });
  if (!userSquad) {
    return NextResponse.json(null);
  }

  return NextResponse.json(userSquad);
}
