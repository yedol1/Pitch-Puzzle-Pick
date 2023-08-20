import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export async function GET() {
  const users = await client.playerInfo.findMany({
    take: 20,
  });
  return NextResponse.json(users);
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     //Read
//     const users = await client.playerInfo.findMany({
//       take: 20,
//     });
//     res.json(users);
//   }
//   if (req.method === 'POST') {
//     //Create
//     res.json({ ok: true });
//   }
//   if (req.method === 'PUT') {
//     //Update
//     res.json({ ok: true });
//   }
//   if (req.method === 'DELETE') {
//     //Delete
//     res.json({ ok: true });
//   }
// }
