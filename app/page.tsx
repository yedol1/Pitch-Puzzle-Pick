import Table from '@/components/table';

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <main>
      <Table />
    </main>
  );
};

export default Home;
