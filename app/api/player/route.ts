import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { filterableFields, infoFields, statusFields } from '../../lib/constans';

const client = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('URL not provided');
  }

  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  const column = url.searchParams.get('column') || 'CA';
  const order = url.searchParams.get('order') || 'desc';
  const uid = url.searchParams.get('UID') || '';
  const validColumns = ['CA', 'PA', 'Name', 'Salary', 'AP'];
  const validOrders = ['asc', 'desc'];

  if (!validColumns.includes(column) || !validOrders.includes(order)) {
    return res.status(400).send('Invalid column or order value');
  }

  const whereConditions: any = {};

  infoFields.forEach((field) => {
    const min = url.searchParams.get(`${field}_min`);
    const max = url.searchParams.get(`${field}_max`);

    if (min || max) {
      whereConditions[field] = {
        ...(min && { gte: Number(min) }),
        ...(max && { lte: Number(max) }),
      };
    }
  });

  statusFields.forEach((field) => {
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

  const users = await client.playerInfo.findMany({
    take: 11,
    ...(uid && { skip: 1, cursor: { UID: Number(uid) } }),
    orderBy: {
      [column]: order,
    },
    where: whereConditions,
    include: {
      status: true,
    },
  });

  return NextResponse.json(users);
}
