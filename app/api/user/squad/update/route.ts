import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

const client = prisma;
export async function POST(req: Request) {
  const data = await req.json();
  const { userId, starting, sub } = data;
  try {
    const userSquad = await client.squad.updateMany({
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
    await client.$disconnect();
  }
}
