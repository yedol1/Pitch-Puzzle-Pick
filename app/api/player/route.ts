import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { InfoFields, StatusFields } from '../../lib/constans';
import { prisma } from '@/app/lib/prisma';

const client = prisma;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('URL not provided');
  }

  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  const column = url.searchParams.get('column') || 'CA';
  const order = url.searchParams.get('order') || 'desc';
  const uid = url.searchParams.get('UID') || '';
  const validColumns = ['CA', 'PA', 'Name', 'Salary', 'AP', 'Club'];
  const validOrders = ['asc', 'desc'];

  if (!validColumns.includes(column) || !validOrders.includes(order)) {
    return res.status(400).send('Invalid column or order value');
  }

  const whereConditions: any = {};

  InfoFields.forEach((field) => {
    const min = url.searchParams.get(`${field}_min`);
    const max = url.searchParams.get(`${field}_max`);
    const value = url.searchParams.get(`${field}_value`);

    if (min || max) {
      whereConditions[field] = {
        ...(min && { gte: Number(min) }),
        ...(max && { lte: Number(max) }),
      };
    }

    if (value) {
      whereConditions[field] = { ...whereConditions[field], contains: value };
    }
  });

  StatusFields.forEach((field) => {
    const min = url.searchParams.get(`${field}_min`);
    const max = url.searchParams.get(`${field}_max`);

    if (min || max) {
      whereConditions.status = {
        ...whereConditions.status,
        [field]: {
          ...(min && { gte: Number(min) }),
          ...(max && { lte: Number(max) }),
        },
      };
    }
  });

  const DetailedPos = url.searchParams.getAll('DetailedPos');
  if (DetailedPos.length > 0) {
    let filteredConditions: any[] = [];

    DetailedPos.forEach((pos) => {
      filteredConditions.push({
        OR: [
          { DetailedPos: { startsWith: pos + ',' } }, // 포지션이 시작하는 경우
          { DetailedPos: { endsWith: ',' + pos } }, // 포지션이 끝나는 경우
          { DetailedPos: { contains: ',' + pos + ',' } }, // 포지션이 중간에 있는 경우
          { DetailedPos: pos }, // 단일 포지션이 있는 경우
        ],
      });
    });

    whereConditions.AND = filteredConditions;
  }

  const users = await client.playerInfo.findMany({
    orderBy: [{ [column]: order }, { UID: 'asc' }],
    where: whereConditions,
    include: {
      status: true,
    },
    take: 11,
    skip: uid ? 1 : 0,
    ...(uid !== '' && {
      cursor: {
        UID: Number(uid),
      },
    }),
  });
  return NextResponse.json(users);
}
