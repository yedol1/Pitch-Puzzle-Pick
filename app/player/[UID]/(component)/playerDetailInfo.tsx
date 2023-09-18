import Image from 'next/image';
import { formatValue, onErrorDefaultPlayerImg, onErrorDefaultFlag, onErrorDefaultLogo } from '@/app/lib/hook';
import PlayerDetailTooltip from './tooltip';
import MyImage from '@/components/customImage';
const playerURL = process.env.NEXT_PUBLIC_PLAYERS_URL;
const clubURL = process.env.NEXT_PUBLIC_CLUBS_URL;
const PlayerDetailInfo = (props: { playerData: any }) => {
  const { playerData } = props;
  if (!playerData || !playerData.status) {
    return null;
  }
  return (
    playerData && (
      <div className='flex flex-row gap-[31px] item-start'>
        <div className='flex flex-col w-[200px] justify-end items-start gap-y-[60px] flex-shrink-0 self-stretch'>
          <MyImage
            src={playerData.UID ? `${playerURL}/${playerData.UID}.png` : '/default.svg'}
            width={200}
            height={200}
            fallbackSrc='/default.svg'
            alt='선수 이미지'
            onError={(e: any) => onErrorDefaultPlayerImg(e)}
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
          <div className='relative flex flex-col w-full'>
            <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
              <PlayerDetailTooltip tit={'선수 풀 네임'} sub={playerData.Name} />
              {'NAME :'}
            </h3>
            <p className='text-[#F75050] text-[20px] w-full h-[58px] font-normal leading-normal tracking-tighter leading-[29px] multi-line-truncate overflow-hidden uppercase'>
              {playerData.Name}
            </p>
          </div>
          <div>
            <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
              <PlayerDetailTooltip tit={'가능한 포지션'} sub={playerData.DetailedPos} />
              <p className='flex w-full'>{'POSITION :'}</p>
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
              <MyImage
                src={playerData.Nat ? `/flags/${playerData.Nat}.svg` : '/defaultFlag.svg'}
                alt='국기'
                width={90}
                height={60}
                fallbackSrc='/defaultFlag.svg'
                onError={(e: any) => onErrorDefaultFlag(e)}
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
              <MyImage
                src={playerData.ClubID ? `${clubURL}/${playerData.ClubID}.png` : '/defaultLogo.png'}
                alt='클럽 엠블럼'
                width={60}
                height={60}
                fallbackSrc='/defaultLogo.png'
                onError={(e: any) => onErrorDefaultLogo(e)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PlayerDetailInfo;
