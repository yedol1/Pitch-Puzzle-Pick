import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('URL not provided');
  }

  // 모든 LeagueNat 값을 가져옵니다.
  const leagueNatResults = await client.playerInfo.findMany({
    select: {
      LeagueNat: true,
    },
    distinct: ['LeagueNat'],
  });
  // 각 결과 항목에서 LeagueNat 값을 추출하여 새 배열에 푸시
  const result = leagueNatResults.map((item) => item.LeagueNat);

  return NextResponse.json(result);
}
