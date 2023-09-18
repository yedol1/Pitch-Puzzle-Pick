import './globals.css';
import NavigationBar from '@/components/navBar';
import { notoSansKr, montserrat, poppins } from '@/app/lib/font';
import CustomProvider from '@/components/provider';
import AuthSession from '@/components/authSession';
import { cls } from './lib/hook';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Pitch Puzzle Pick',
  description:
    '다양한 선수 정보 중에서 자신이 원하는 선수를 찾아내는 것이 마치 퍼즐을 풀어나가는 것처럼 즐거운 경험이 되었으면 좋겠습니다.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='ko'>
    <body
      className={`${cls(
        notoSansKr.className,
        montserrat.variable,
        poppins.variable,
      )} relative flex min-h-screen flex-col items-center`}
    >
      <AuthSession>
        <CustomProvider>
          <NavigationBar />
          {children}
          <Footer />
        </CustomProvider>
      </AuthSession>
    </body>
  </html>
);

export default RootLayout;
