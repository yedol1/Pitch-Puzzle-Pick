'use client';

import Table from '@/components/table';
import { useEffect, useState } from 'react';

// Prisma does not support Edge without the Data Proxy currently
export const runtime = 'edge';
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const fetchData = await fetch('/api/player');
      const data = await fetchData.json();
      setData(data);
    })();
  }, []);
  console.log(data);
  return (
    <main>
      <Table data={data} />
    </main>
  );
};

export default Home;
