import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import {
  eplSort,
  franceSort,
  germanySort,
  koreanSort,
  netherlandsSort,
  portugalSort,
  seriaSort,
  spainSort,
} from '@/app/lib/hook';

const client = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('URL not provided');
  }
  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  const nat = url.searchParams.get('LeagueNat') || '';

  // LeagueNat 과 일치하는 겹치지않는 모든 Based 값을 가져옵니다.
  const leagueBasedResults = await client.playerInfo.findMany({
    select: {
      Based: true,
    },
    distinct: ['Based'],
    where: {
      LeagueNat: nat,
    },
  });

  const result = leagueBasedResults.map((item) => item.Based);
  // 각 결과 항목에서 LeagueNat 값을 추출하여 새 배열에 푸시
  switch (nat) {
    case '이탈리아':
      result.sort(seriaSort);
      break;
    case '잉글랜드':
      result.sort(eplSort);
      break;
    case '독일':
      result.sort(germanySort);
      break;
    case '프랑스':
      result.sort(franceSort);
      break;
    case '스페인':
      result.sort(spainSort);
      break;
    case '포르투갈':
      result.sort(portugalSort);
      break;
    case '네덜란드':
      result.sort(netherlandsSort);
      break;
    default:
      result.sort(koreanSort);
      break;
  }

  return NextResponse.json(result);
}
