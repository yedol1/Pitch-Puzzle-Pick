'use client';
import Table from '@/components/table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Table isDisabled={true} />
      </main>
    </QueryClientProvider>
  );
};

export default Home;
