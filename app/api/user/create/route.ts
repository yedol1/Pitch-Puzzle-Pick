import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
enum SocialProvider {
  GOOGLE = 'GOOGLE',
  NAVER = 'NAVER',
  FACEBOOK = 'FACEBOOK',
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log('Request Body:', data);

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
  console.log(email, name, image, sessionProvider);

  try {
    const existingUser = await prisma.socialUser.findFirst({
      where: {
        email: email,
        provider: sessionProvider,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: 'User with this email already exists.',
        },
        {
          status: 409, // Conflict
        },
      );
    }

    await prisma.socialUser.create({
      data: {
        email,
        name,
        image,
        provider: sessionProvider.toUpperCase(),
      },
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
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
    await prisma.$disconnect();
  }
}
