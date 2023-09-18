import PlayerDetailTooltip from './tooltip';
import {
  culGKSpdStat,
  culGkAerStat,
  culGkDefCtlStat,
  culGkDistStat,
  culGkEccStat,
  culGkMentalStat,
  culGkPhyStat,
  culGkSaveStat,
} from '@/app/lib/hook';

const GkMainStat = (props: { playerData: any }) => {
  const { playerData } = props;
  if (!playerData || !playerData.status) {
    return null;
  }

  return (
    <div className='flex w-[460px] items-start gap-x-[137px]'>
      <div className='flex flex-col items-start space-y-5'>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 슈팅방어 )' sub={'1:1방어+반사신경'} />
            SAVE :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGkSaveStat(playerData?.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 수비조율 )' sub={'수비조율+페널티박스장악력'} />
            DEF CONTROL :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGkDefCtlStat(playerData?.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 공중볼 )' sub={'공중장악력+펀칭빈도+볼핸들링'} />
            AERIAL GRIP :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGkAerStat(playerData?.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 볼배급 )' sub={'골킥+공던지기'} />
            DISTRIBUTION :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGkDistStat(playerData?.status)}
          </p>
        </div>
      </div>
      <div className='flex flex-col items-start space-y-5'>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 스피드 )' sub={'주력+순간속도+민첩'} />
            SPEED :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGKSpdStat(playerData?.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 테크닉 )' sub={'판단력+팀워크+예측력+대담성+승부욕+집중력'} />
            MENTAL :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGkMentalStat(playerData?.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 피지컬 )' sub={'몸싸움+순간속도+균형감각+지구력'} />
            PHYSICAL :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGkPhyStat(playerData?.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 튀는행동 )' sub={'기행'} />
            ECCENTRICITY :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culGkEccStat(playerData?.status)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GkMainStat;
