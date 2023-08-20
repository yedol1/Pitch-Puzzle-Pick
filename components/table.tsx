import { notoSansKr, montserrat } from '@/app/lib/font';
import TableRow from './tableRow';

const AlignBtn = () => {
  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' width='9' height='5' viewBox='0 0 9 5' fill='none' className='mb-0.5'>
        <path d='M4.5 0L8.39712 4.5L0.602886 4.5L4.5 0Z' fill='#D0D0CE' />
      </svg>
      <svg xmlns='http://www.w3.org/2000/svg' width='9' height='5' viewBox='0 0 9 5' fill='none'>
        <path d='M4.5 5L0.602885 0.5L8.39711 0.500001L4.5 5Z' fill='#D0D0CE' />
      </svg>
    </>
  );
};

const Table = (data: any) => {
  console.log(data);
  return (
    <table
      className={`${notoSansKr.className} flex flex-col items-center rounded-lg mt-8 shadow-custom rounded-bl-lg rounded-br-lg`}
    >
      <thead className='text-sm text-white font-normal font-medium leading-none tracking-tighter'>
        <tr className='flex h-42 bg-pri-color rounded-tl-lg rounded-tr-lg '>
          <th className='flex flex-row w-table py-0 pl-6 items-center space-x-1.5'>
            <p className='text-sm font-normal font-medium leading-none tracking-tighter '>현재능력</p>
            <button className='flex flex-col justify-center items-start'>
              <AlignBtn />
            </button>
          </th>
          <th className='flex w-table py-0 pl-6 items-center space-x-1.5'>
            <p className='text-sm font-normal font-medium leading-none tracking-tighter'>잠재능력</p>
            <button className='flex flex-col justify-center items-start'>
              <AlignBtn />
            </button>
          </th>
          <th className='flex w-name py-0 pl-6 items-center space-x-1.5'>
            <p className='text-sm font-normal font-medium leading-none tracking-tighter'>이름</p>
            <button className='flex flex-col justify-center items-start'>
              <AlignBtn />
            </button>
          </th>
          <th className='hidden tableSalary:flex w-170 py-0 pl-6 items-center space-x-1.5'>
            <p className='text-sm font-normal font-medium leading-none tracking-tighter'>급여</p>
            <button className='flex flex-col justify-center items-start'>
              <AlignBtn />
            </button>
          </th>
          <th className='hidden tableAP:flex w-table py-0 pl-6 items-center space-x-1.5'>
            <p className='text-sm font-normal font-medium leading-none tracking-tighter'>몸값</p>
            <button className='flex flex-col justify-center items-start'>
              <AlignBtn />
            </button>
          </th>
          <th className='hidden tableDOB:flex w-170 py-0 pl-6 items-center space-x-1.5'>
            <p className='text-sm font-normal font-medium leading-none tracking-tighter'>생일</p>
            <button className='flex flex-col justify-center items-start'>
              <AlignBtn />
            </button>
          </th>
        </tr>
      </thead>
      <tbody className={`${montserrat.className} text-sm font-normal font-medium leading-none tracking-tighter`}>
        {data.data.map((user: any) => (
          <TableRow
            user={user}
            // isDisabled={true}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
