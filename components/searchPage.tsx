import Table from '@/components/table';
import OptionSelect from '@/components/optionSelect';

const SearchPage = () => {
  return (
    <main>
      <OptionSelect />
      <Table isDisabled={true} />
      <div className='h-20'></div>
    </main>
  );
};
export default SearchPage;
