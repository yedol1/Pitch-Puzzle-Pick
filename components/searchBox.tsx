'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/app/lib/store/filters';
import { RootState } from '@/app/lib/store/reduxType';
import { Button, Input, List, ListItem, Card } from '@material-tailwind/react';
import { useState } from 'react';
import { useFetchSearchPlayers } from '@/app/lib/reactQuery/useFetchSearchPlayers';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SearchBox = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { filters: actualFilters } = useSelector((state: RootState) => state.filters);
  const [name, setName] = useState(actualFilters.Name.value);
  const [isFocus, setIsFocus] = useState(false);
  const [preventBlur, setPreventBlur] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const handleMouseDown = () => {
    setPreventBlur(true);
  };

  const handleMouseUp = () => {
    setPreventBlur(false);
  };

  const handleBlur = () => {
    if (!preventBlur) {
      setIsFocus(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isComposing) return;
    if (e.key === 'Enter' && name) {
      handleNameChange(name);
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
      setIsFocus(false);
    }
  };

  const { data: searchPlayerData, isSuccess, isLoading } = useFetchSearchPlayers(name);
  const handleNameChange = (value: string) => {
    const updatedFilters = { ...actualFilters, Name: { value } };
    dispatch(setFilters(updatedFilters));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value === '') {
      handleNameChange('');
    }
  };

  return (
    <div
      className='relative flex w-full flex-col items-start space-y-2 mb-[24px]'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <p className='text-xl font-semibold leading-7 w-text-area h-7 tracking-option'>{'Name :'}</p>
      <div className='relative flex w-full'>
        <Input
          id='NameFilter'
          size='md'
          color='blue'
          label='Input Name'
          type='text'
          className='bg-white'
          value={name}
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={handleBlur}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
        />
        <Button
          size='sm'
          color={name === '' ? 'blue-gray' : 'blue'}
          disabled={!name}
          className='!absolute right-1 top-1 rounded'
          onClick={() => {
            handleNameChange(name);
            if (name === '') {
              handleNameChange('');
            }
            setIsFocus(false);
          }}
        >
          Search
        </Button>
      </div>
      {isFocus && name !== '' && (
        <Card className='w-full absolute z-10 top-[70px]'>
          <List>
            {isLoading ? (
              <ListItem>Loading...</ListItem> // Display a loading message when isLoading is true
            ) : searchPlayerData.length > 0 ? (
              searchPlayerData?.map((player: any) => (
                <ListItem
                  key={`search-${player.UID}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setName(player.Name);
                    handleNameChange(player.Name);
                    setIsFocus(false);
                  }}
                  className='flex flex-row'
                >
                  <Link href={`${pathname}player/${player.UID}`} className='hover:underline cursor-pointer'>
                    {player.Name}
                  </Link>
                  <p className='text-[12px] text-gray-700 ml-[12px]'>{player.Position}</p>
                </ListItem>
              ))
            ) : (
              <ListItem>검색 결과가 없습니다.</ListItem>
            )}
          </List>
        </Card>
      )}
    </div>
  );
};

export default SearchBox;
