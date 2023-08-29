import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { koreanSort } from '@/app/lib/hook';

const client = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('URL not provided');
  }
  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  const nat = url.searchParams.get('LeagueNat') || '';
  const based = url.searchParams.get('Based') || '';

  // LeagueNat 과 일치하는 겹치지않는 모든 Based 값을 가져옵니다.
  const leagueClubResults = await client.playerInfo.findMany({
    select: {
      Club: true,
    },
    distinct: ['Club'],
    where: {
      LeagueNat: nat,
      Based: based,
    },
  });

  const result = leagueClubResults.map((item) => item.Club).sort(koreanSort);
  return NextResponse.json(result);
}
