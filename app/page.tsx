import { Suspense } from 'react';
import SearchPage from '@/components/searchPage';
import Banner from '@/components/banner';
import Loading from './loading';
const Home = () => {
  return (
    <>
      <Banner />
      <SearchPage />
    </>
  );
};
export default Home;
