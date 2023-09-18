import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

const client = prisma;
enum SocialProvider {
  GOOGLE = 'GOOGLE',
  NAVER = 'NAVER',
  FACEBOOK = 'FACEBOOK',
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.session || !data.session.user) {
    return NextResponse.json(
      {
        message: 'Invalid session',
      },
      {
        status: 400,
      },
    );
  }

  const { email, name, image } = data.session.user;
  let sessionProvider = data.provider;
  sessionProvider = sessionProvider.toUpperCase();
  if (!Object.values(SocialProvider).includes(sessionProvider as SocialProvider)) {
    return NextResponse.json(
      {
        message: 'Invalid provider',
      },
      {
        status: 400,
      },
    );
  }

  try {
    const createdUser = await client.$transaction(async (client) => {
      // 사용자 생성
      const newUser = await client.socialUser.create({
        data: {
          email,
          name,
          image,
          provider: sessionProvider.toUpperCase(),
        },
      });

      // 해당 사용자의 ID로 Squad 생성
      await client.squad.create({
        data: {
          socialUserId: newUser.id,
          startingPlayerUids: '',
          subPlayerUids: '',
        },
      });

      return newUser;
    });

    return NextResponse.json(
      {
        message: 'User and squad created successfully',
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      },
    );
  } finally {
    await client.$disconnect();
  }
}
