'use client';
import { Provider } from 'react-redux';
import store from './lib/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchPage from '@/components/searchPage';

const queryClient = new QueryClient();
const Home = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </Provider>
  );
};
export default Home;
