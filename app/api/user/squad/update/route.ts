import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();
  console.log('Request Body:', data);
  const { userId, starting, sub } = data;
  console.log(userId, starting, sub);
  try {
    const userSquad = await prisma.squad.updateMany({
      where: {
        socialUserId: userId,
      },
      data: {
        startingPlayerUids: starting,
        subPlayerUids: sub,
      },
    });
    return NextResponse.json({
      message: 'Squad updated successfully',
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Failed to update squad',
      },
      {
        status: 500,
      },
    );
  } finally {
    await prisma.$disconnect();
  }
}
