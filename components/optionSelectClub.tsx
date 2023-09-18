// 입력하자마자 바로바로 dispatch 되는 필터링 옵션 선택창
'use client';
import { useDispatch, useSelector } from 'react-redux';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { setFilters } from '@/app/lib/store/filters';
import { RootState } from '@/app/lib/store/reduxType';
import { useFetchLeagueNat } from '@/app/lib/reactQuery/useFetchLeagueNat';
import { useFetchLeagueBased } from '@/app/lib/reactQuery/useFetchLeagueBased';
import { useFetchLeagueClub } from '@/app/lib/reactQuery/useFetchLeagueClub';

type OptionBelong = {
  value: string;
  label: string;
};

const OptionSelectClub = () => {
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
  const selectedBelong = useSelector((state: RootState) => state.filters.filters.Belong);

  // select option ( 최대 최소 필터링 옵션 )
  const { data: leagueNatData, isLoading: natIsLoading } = useFetchLeagueNat();
  const natOption = leagueNatData?.map((item: any) => ({ value: item, label: item })) || [];

  const handleNatOnchange = (value: SingleValue<OptionBelong>, actionMeta: ActionMeta<OptionBelong>) => {
    if (value) {
      dispatch(
        setFilters({
          ...actualFilters,
          Belong: {
            LeagueNat: value,
            Based: '',
            Club: '',
          },
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...actualFilters,
          Belong: {
            LeagueNat: '',
            Based: '',
            Club: '',
          },
        }),
      );
    }
  };

  // select option ( 소속 리그 필터링 옵션 )
  const { data: leagueBasedData, isLoading: basedIsLoading } = useFetchLeagueBased(selectedBelong?.LeagueNat.value);
  const basedOption = leagueBasedData?.map((item: any) => ({ value: item, label: item })) || [];

  const handleBasedOnchange = (value: SingleValue<OptionBelong>, actionMeta: ActionMeta<OptionBelong>) => {
    if (value) {
      dispatch(
        setFilters({
          ...actualFilters,
          Belong: {
            ...selectedBelong,
            Based: value,
            Club: '',
          },
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...actualFilters,
          Belong: {
            ...selectedBelong,
            Based: '',
            Club: '',
          },
        }),
      );
    }
  };

  const { data: clubData, isLoading: clubIsLoading } = useFetchLeagueClub(
    selectedBelong?.Based.value,
    selectedBelong?.LeagueNat.value,
  );
  const clubOption = clubData?.map((item: any) => ({ value: item, label: item })) || [];

  const handleClubOnchange = (value: SingleValue<OptionBelong>, actionMeta: ActionMeta<OptionBelong>) => {
    if (value) {
      dispatch(
        setFilters({
          ...actualFilters,
          Belong: {
            ...selectedBelong,
            Club: value,
          },
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...actualFilters,
          Belong: {
            ...selectedBelong,
            Club: '',
          },
        }),
      );
    }
  };

  return (
    <>
      {/* 클럽 검색창 */}
      <div className='flex w-option-container flex-col items-start space-y-2'>
        <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Club :'}</p>
        <div className='flex flex-row w-full justify-between'>
          <Select
            instanceId='option-select'
            options={natOption}
            placeholder='나라 선택'
            isLoading={natIsLoading}
            isClearable={true}
            onChange={handleNatOnchange}
            value={selectedBelong?.LeagueNat}
            className='w-[176px] h-[38px]'
          />
          <Select
            instanceId='option-select'
            options={basedOption}
            placeholder='리그 선택'
            isLoading={basedIsLoading}
            isClearable={true}
            onChange={handleBasedOnchange}
            value={selectedBelong?.Based}
            className='w-[176px] h-[38px]'
            isDisabled={!selectedBelong?.LeagueNat}
          />
        </div>
        <Select
          instanceId='option-select'
          options={clubOption}
          placeholder='클럽 선택'
          isLoading={clubIsLoading}
          isClearable={true}
          onChange={handleClubOnchange}
          value={selectedBelong?.Club}
          className='w-full h-[38px]'
          isDisabled={!selectedBelong?.Based}
        />
      </div>
    </>
  );
};

export default OptionSelectClub;
