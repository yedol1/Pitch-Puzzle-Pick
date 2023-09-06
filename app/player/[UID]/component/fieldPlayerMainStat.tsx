import { useParams } from 'next/navigation';
import { culAtkStat, culDefStat, culMentalStat, culPhyStat, culSpdStat, culTechStat } from '@/app/lib/hook';
import { useFetchSelectedPlayer } from '@/app/lib/reactQuery/useFetchSelectedPlayer';
import PlayerDetailTooltip from './tooltip';

const FieldPlayerMainStat = () => {
  const params = useParams();
  const uid = Number(params.UID);
  const { data: playerData, isLoading, error: playerError } = useFetchSelectedPlayer(uid);

  if (isLoading) return <div>loading...</div>;

  return (
    <div className='flex w-[460px] items-start gap-x-[137px]'>
      <div className='flex flex-col items-start space-y-5'>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 공격 )' sub={'오프더볼+골결정력+침착성+드리블'} />
            ATTACK :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culAtkStat(playerData.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 수비 )' sub={'태클+수비위치+일대일마크+집중력'} />
            DEFENCE :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culDefStat(playerData.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 테크닉 )' sub={'개인기+볼트래핑+패스+시야+천재성'} />
            TECHNICAL :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culTechStat(playerData.status)}
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
            {culSpdStat(playerData.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 피지컬 )' sub={'몸싸움+균형감각+지구력+점프+타고난체력'} />
            PHYSICAL :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culPhyStat(playerData.status)}
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <h3 className='flex items-center text-[#424242] text-[18px] font-normal tracking-tighter uppercase'>
            <PlayerDetailTooltip tit='주요 스탯 ( 정신력 )' sub={'판단력+팀워크+예측력+대담성+승부욕+집중력'} />
            MENTAL :
          </h3>
          <p className='text-[#F75050] text-[36px] font-bold leading-none tracking-tightest uppercase'>
            {culMentalStat(playerData.status)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FieldPlayerMainStat;
