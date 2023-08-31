'use client';
import { Provider } from 'react-redux';
import store from './lib/store/store';
import { ThemeProvider } from '@material-tailwind/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SearchPage from '@/components/searchPage';
import Banner from '@/components/banner';

const queryClient = new QueryClient();
const Home = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Banner />
          <SearchPage />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};
export default Home;
