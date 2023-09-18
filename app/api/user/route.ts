import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
const client = prisma;
enum SocialProvider {
  GOOGLE = 'GOOGLE',
  NAVER = 'NAVER',
  FACEBOOK = 'FACEBOOK',
}
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    // return res.status(400).send('URL not provided');
    return NextResponse.json(
      {
        message: 'URL not provided',
      },
      {
        status: 400,
      },
    );
  }
  const baseUrl = `http://${req.headers.host}`;
  const url = new URL(req.url, baseUrl);

  const email = url.searchParams.get('email') || '';
  const provider = url.searchParams.get('provider') || '';

  if (!email) {
    // return res.status(400).json({ error: 'Email not provided' });
    return NextResponse.json(
      {
        message: 'Email not provided',
      },
      {
        status: 400,
      },
    );
  }
  // if (!provider) {
  //   return res.status(400).json({ error: 'Provider not provided' });
  // }

  if (!Object.values(SocialProvider).includes(provider as SocialProvider)) {
    // return res.status(400).json({ error: 'Invalid provider' });
    return NextResponse.json(
      {
        message: 'Invalid provider',
      },
      {
        status: 400,
      },
    );
  }

  const user = await client.socialUser.findFirst({
    where: {
      email: email,
      provider: provider as SocialProvider,
    },
  });
  if (!user) {
    return NextResponse.json(null);
  }

  return NextResponse.json(user.id);
}
