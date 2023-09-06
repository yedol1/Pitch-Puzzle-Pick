import { useParams } from 'next/navigation';
import Image from 'next/image';
import { formatValue, onErrorDefaultPlayerImg, onErrorDefaultFlag, onErrorDefaultLogo } from '@/app/lib/hook';
import PlayerDetailTooltip from './tooltip';
import { useFetchSelectedPlayer } from '@/app/lib/reactQuery/useFetchSelectedPlayer';

const PlayerDetailInfo = () => {
  const params = useParams();
  const uid = Number(params.UID);
  const { data: playerData, isLoading, error: playerError } = useFetchSelectedPlayer(uid);

  if (isLoading) return <div>loading...</div>;

  return (
    <div className='flex flex-row gap-[31px] item-start'>
      <div className='flex flex-col w-[200px] justify-end items-start gap-y-[60px] flex-shrink-0 self-stretch'>
        <Image
          src='/[uid].svg'
          width={200}
          height={200}
          alt='선수 이미지'
          onError={(e) => onErrorDefaultPlayerImg(e)}
        />
        <div>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit={'급여 ( 주 단위 )'} sub={'€ ' + formatValue(playerData.Salary)} />
            {'salary ( week ) :'}
          </h3>
          <p className='text-[#F75050] text-[20px] font-normal leading-normal tracking-tighter uppercase'>
            {'€ ' + formatValue(playerData.Salary)}
          </p>
        </div>
      </div>
      <div className='flex flex-col w-[112px] items-start gap-y-[20px] flex-shrink-0 self-stretch'>
        <div>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit={'선수 풀 네임'} sub={playerData.Name} />
            {'NAME :'}
          </h3>
          <p className='text-[#F75050] text-[20px] w-[112px] h-[58px] font-normal leading-normal tracking-tighter multi-line-truncate uppercase'>
            {playerData.Name}
          </p>
        </div>
        <div>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit={'가능한 포지션'} sub={playerData.DetailedPos} />
            {'POSITION :'}
          </h3>
          <p className='text-[#F75050] text-[20px] w-[112px] font-normal leading-normal tracking-tighter uppercase whitespace-nowrap overflow-hidden truncate'>
            {playerData.DetailedPos}
          </p>
        </div>
        <div>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip
              tit={'현재 능력 / 잠재 능력 (백분율)'}
              sub={Math.ceil(playerData.CA / 2) + ' / ' + Math.ceil(playerData.PA / 2)}
            />
            {'CA / PA :'}
          </h3>
          <p className='text-[#F75050] text-[20px] w-[112px] font-normal leading-normal tracking-tighter uppercase whitespace-nowrap overflow-hidden truncate'>
            {Math.ceil(playerData.CA / 2) + ' / ' + Math.ceil(playerData.PA / 2)}
          </p>
        </div>
        <div>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit={'선수 이적가능 금액'} sub={'€ ' + formatValue(playerData.AP)} />
            {'PRICE :'}
          </h3>
          <p className='text-[#F75050] text-[20px] w-[112px] font-normal leading-normal tracking-tighter uppercase whitespace-nowrap overflow-hidden truncate'>
            {'€ ' + formatValue(playerData.AP)}
          </p>
        </div>
      </div>
      <div className='flex flex-col items-start gap-[20px] w-[90px] flex-shrink-0 self-stretch'>
        <div className='w-[90px] relative'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit={'선수 국적'} sub={playerData.Nat} />
            {'NAT :'}
          </h3>
          <div className='relative w-[90px] h-[60px] mt-[10px]'>
            <Image
              src={`/flags/${playerData.Nat}.svg`}
              alt='국기'
              layout='fill'
              objectFit='cover'
              onError={(e) => onErrorDefaultFlag(e)}
            />
          </div>
        </div>
        <div className='w-[90px] relative'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip
              tit={'선수 소속 클럽'}
              sub={`${playerData.LeagueNat} ${playerData.Based} "${playerData.Club}"`}
            />
            {'TEAM :'}
          </h3>
          <div className='relative w-[60px] h-[60px] mt-[10px]'>
            <Image
              src={`/flags/0.svg`}
              alt='국기'
              layout='fill'
              objectFit='cover'
              onError={(e) => onErrorDefaultLogo(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailInfo;
