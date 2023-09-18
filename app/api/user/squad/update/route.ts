import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

const client = prisma;
export async function POST(req: Request) {
  const data = await req.json();
  console.log('Request Body:', data);
  const { userId, starting, sub } = data;
  console.log(userId, starting, sub);
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
