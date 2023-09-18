import { Montserrat, Noto_Sans_KR, Roboto, Poppins } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  preload: false,
});
const montserrat = Montserrat({
  weight: ['500', '700'],
  preload: false,
  variable: '--montserrat',
});
const poppins = Poppins({
  weight: ['600', '700'],
  preload: false,
  variable: '--poppins',
});

export { notoSansKr, montserrat, poppins };
