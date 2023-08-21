import Table from '@/components/table';

// Prisma does not support Edge without the Data Proxy currently
export const runtime = 'edge';
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

// export async function fetchDefaultData() {
//   const fetchData = await fetch('/api/player');
//   const data = await fetchData.json();
//   return data;
// }

const Home = () => {
  return (
    <main>
      <Table isDisabled={true} />
    </main>
  );
};

export default Home;
