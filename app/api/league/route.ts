import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { koreanSort } from '@/app/lib/hook';
import { prisma } from '@/app/lib/prisma';

const client = prisma;
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
  const result = leagueNatResults.map((item) => item.LeagueNat).sort(koreanSort);

  return NextResponse.json(result);
}
