'use client';
import { notoSansKr, montserrat } from '@/app/lib/font';
import TableRow from './tableRow';
import { HeaderType, AlignBtnProps, PlayerInfoType } from '@/app/type';
import Observer from './observer';
import { useDispatch, useSelector } from 'react-redux';
import { setHeader, toggleOrder } from '@/app/lib/store/sort';
import { useFetchPlayers } from '@/app/lib/reactQuery/useFetchPlayer';
import { RootState } from '@/app/lib/store/reduxType';
import { NullPlayerInfo } from '@/app/lib/constans';

const AlignBtn = ({ header, order, currentHeader }: AlignBtnProps) => {
  const isSelected = header === currentHeader;

  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' width='9' height='5' viewBox='0 0 9 5' fill='none' className='mb-0.5'>
        <path
          d='M4.5 0L8.39712 4.5L0.602886 4.5L4.5 0Z'
          fill={isSelected && order === 'desc' ? '#818181' : '#D0D0CE'}
        />
      </svg>
      <svg xmlns='http://www.w3.org/2000/svg' width='9' height='5' viewBox='0 0 9 5' fill='none'>
        <path
          d='M4.5 5L0.602885 0.5L8.39711 0.500001L4.5 5Z'
          fill={isSelected && order === 'asc' ? '#818181' : '#D0D0CE'}
        />
      </svg>
    </>
  );
};

const Table = ({ isDisabled }: any) => {
  const dispatch = useDispatch();

  // Redux store에서 상태 가져오기
  const selectedHeader = useSelector((state: RootState) => state.table.selectedHeader);
  const order = useSelector((state: RootState) => state.table.order);
  const filters = useSelector((state: RootState) => state.filters.filters);
  // 상태와 함께 데이터 가져오기
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchPlayers(selectedHeader, order, filters);

  const handleClick = (headerValue: HeaderType) => {
    if (selectedHeader === headerValue) {
      dispatch(toggleOrder()); // Redux action 사용
    } else {
      dispatch(setHeader(headerValue)); // Redux action 사용
    }
  };
  console.log('다음페이지있음?', hasNextPage);

  return (
    <>
      <table
        className={`${notoSansKr.className} flex w-fit-content flex-col items-center rounded-lg mt-8 shadow-custom rounded-bl-lg rounded-br-lg`}
      >
        <thead className='text-sm text-white font-normal font-medium leading-none tracking-tighter'>
          <tr className='flex h-42 bg-pri-color rounded-tl-lg rounded-tr-lg '>
            <th className='flex flex-row w-table py-0 pl-6 items-center space-x-1.5'>
              <p className='text-sm font-normal font-medium leading-none tracking-tighter '>현재능력</p>
              <button
                className='flex flex-col justify-center items-start'
                onClick={() => handleClick('CA' as HeaderType)}
              >
                <AlignBtn header='CA' order={order} currentHeader={selectedHeader} />
              </button>
            </th>
            <th className='flex w-table py-0 pl-6 items-center space-x-1.5'>
              <p className='text-sm font-normal font-medium leading-none tracking-tighter'>잠재능력</p>
              <button
                className='flex flex-col justify-center items-start'
                onClick={() => handleClick('PA' as HeaderType)}
              >
                <AlignBtn header='PA' order={order} currentHeader={selectedHeader} />
              </button>
            </th>
            <th className='flex w-name py-0 pl-6 items-center space-x-1.5'>
              <p className='text-sm font-normal font-medium leading-none tracking-tighter'>이름</p>
              <button
                className='flex flex-col justify-center items-start'
                onClick={() => handleClick('Name' as HeaderType)}
              >
                <AlignBtn header='Name' order={order} currentHeader={selectedHeader} />
              </button>
            </th>
            <th className='hidden tableSalary:flex w-170 py-0 pl-6 items-center space-x-1.5'>
              <p className='text-sm font-normal font-medium leading-none tracking-tighter'>급여</p>
              <button
                className='flex flex-col justify-center items-start'
                onClick={() => handleClick('Salary' as HeaderType)}
              >
                <AlignBtn header='Salary' order={order} currentHeader={selectedHeader} />
              </button>
            </th>
            <th className='hidden tableAP:flex w-table py-0 pl-6 items-center space-x-1.5'>
              <p className='text-sm font-normal font-medium leading-none tracking-tighter'>이적 금액</p>
              <button
                className='flex flex-col justify-center items-start'
                onClick={() => handleClick('AP' as HeaderType)}
              >
                <AlignBtn header='AP' order={order} currentHeader={selectedHeader} />
              </button>
            </th>
            <th className='hidden tableDOB:flex w-170 py-0 pl-6 items-center space-x-1.5'>
              <p className='text-sm font-normal font-medium leading-none tracking-tighter'>생일</p>
            </th>
          </tr>
        </thead>
        <tbody className={`${montserrat.className} text-sm font-normal font-medium leading-none tracking-tighter`}>
          {data?.pages[0].length ? (
            data.pages.map((pageData: any) =>
              pageData.map((user: PlayerInfoType) => <TableRow user={user} key={user.UID} isDisabled={isDisabled} />),
            )
          ) : (
            <TableRow user={NullPlayerInfo} key={NullPlayerInfo.UID} isDisabled={isDisabled} />
          )}
        </tbody>
      </table>
      {hasNextPage && <Observer handleIntersection={() => fetchNextPage()} />}
    </>
  );
};

export default Table;
