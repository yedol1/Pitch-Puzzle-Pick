// 'use client';
import Table from '@/components/table';
import OptionSelect from '@/components/optionSelect';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store/filters';
import { useFetchPlayers } from '@/app/lib/reactQuery/useFetchPlayer';

const SearchPage = () => {
  // Redux store에서 상태 가져오기
  const selectedHeader = useSelector((state: RootState) => state.table.selectedHeader);
  const order = useSelector((state: RootState) => state.table.order);
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
  // 상태와 함께 데이터 가져오기
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchPlayers(
    selectedHeader,
    order,
    actualFilters,
  );
  console.log(actualFilters);
  console.log(data);
  console.log('Has next page:', hasNextPage);

  return (
    <main>
      <OptionSelect />
      <Table data={data} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isDisabled={true} />
      <div className='h-20'></div>
    </main>
  );
};
export default SearchPage;
