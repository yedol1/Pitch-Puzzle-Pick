import { Montserrat, Noto_Sans_KR, Roboto, Poppins } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  preload: false,
  fallback: ['-apple-system', 'Roboto', 'sans-serif'],
});
const montserrat = Montserrat({
  weight: ['500', '700'],
  preload: false,
  display: 'swap',
  variable: '--montserrat',
});
const poppins = Poppins({
  weight: ['600', '700'],
  display: 'swap',
  variable: '--poppins',
  preload: false,
});

export { notoSansKr, montserrat, poppins };
