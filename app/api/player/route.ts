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
  const column = url.searchParams.get('column') || 'CA';
  const order = url.searchParams.get('order') || 'desc';
  const validColumns = ['CA', 'PA', 'Name', 'Salary', 'AP'];
  const validOrders = ['asc', 'desc'];
  if (!validColumns.includes(column) || !validOrders.includes(order)) {
    return res.status(400).send('Invalid column or order value');
  }

  const users = await client.playerInfo.findMany({
    take: 20,
    orderBy: {
      [column]: order,
    },
  });

  return NextResponse.json(users);
}
