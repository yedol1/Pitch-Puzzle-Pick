import './globals.css';
import NavigationBar from '@/components/navBar';
import Banner from '@/components/banner';
import { notoSansKr } from './lib/font';

export const metadata = {
  title: 'Pitch Puzzle Pick',
  description:
    '다양한 선수 정보 중에서 자신이 원하는 선수를 찾아내는 것이 마치 퍼즐을 풀어나가는 것처럼 즐거운 경험이 되었으면 좋겠습니다.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='ko'>
    <body className={`${notoSansKr.className} relative flex min-h-screen flex-col items-center`}>
      <NavigationBar />
      <Banner />
      {children}
    </body>
  </html>
);

export default RootLayout;
