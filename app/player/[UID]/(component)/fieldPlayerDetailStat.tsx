import { Typography, Card } from '@material-tailwind/react';
import { getColorClass } from '@/app/lib/hook';

const FieldPlayerDetailStat = (props: { playerData: any }) => {
  const { playerData } = props;
  if (!playerData || !playerData.status) {
    return null;
  }
  const PHYSICAL_ROWS = [
    {
      name: '가속도',
      abil: playerData.status.Acc,
    },
    {
      name: '균형감각',
      abil: playerData.status.Bal,
    },
    {
      name: '몸싸움',
      abil: playerData.status.Str,
    },
    {
      name: '민첩성',
      abil: playerData.status.Agi,
    },
    {
      name: '점프 거리',
      abil: playerData.status.Jum,
    },
    {
      name: '주력',
      abil: playerData.status.Pac,
    },
    {
      name: '지구력',
      abil: playerData.status.Sta,
    },
    {
      name: '타고난 체력',
      abil: playerData.status.Nat,
    },
  ];
  const SKILL_ROWS = [
    {
      name: '개인기',
      abil: playerData.status.Tec,
    },
    {
      name: '골 결정력',
      abil: playerData.status.Fin,
    },
    {
      name: '드리블',
      abil: playerData.status.Dri,
    },
    {
      name: '일대일마크',
      abil: playerData.status.Mar,
    },
    {
      name: '장거리 스로인',
      abil: playerData.status.LTh,
    },
    {
      name: '중거리 슛',
      abil: playerData.status.Lon,
    },
    {
      name: '코너킥',
      abil: playerData.status.Cor,
    },
    {
      name: '크로스',
      abil: playerData.status.Cro,
    },
    {
      name: '태클',
      abil: playerData.status.Tck,
    },
    {
      name: '패스',
      abil: playerData.status.Pas,
    },
    {
      name: '퍼스트 터치',
      abil: playerData.status.Fir,
    },
    {
      name: '패널티킥',
      abil: playerData.status.Pen,
    },
    {
      name: '프리킥',
      abil: playerData.status.Fre,
    },
    {
      name: '헤더',
      abil: playerData.status.Hea,
    },
  ];
  const MENTAL_ROWS = [
    {
      name: '대담성',
      abil: playerData.status.Bra,
    },
    {
      name: '리더십',
      abil: playerData.status.Ldr,
    },
    {
      name: '승부욕',
      abil: playerData.status.Det,
    },
    {
      name: '시야',
      abil: playerData.status.Vis,
    },
    {
      name: '예측력',
      abil: playerData.status.Ant,
    },
    {
      name: '오프 더 볼',
      abil: playerData.status.OtB,
    },
    {
      name: '위치 선정',
      abil: playerData.status.Pos,
    },
    {
      name: '적극성',
      abil: playerData.status.Agg,
    },
    {
      name: '집중력',
      abil: playerData.status.Cnt,
    },
    {
      name: '천재성',
      abil: playerData.status.Fla,
    },
    {
      name: '침착성',
      abil: playerData.status.Cmp,
    },
    {
      name: '팀워크',
      abil: playerData.status.Tea,
    },
    {
      name: '판단력',
      abil: playerData.status.Dec,
    },
    {
      name: '활동량',
      abil: playerData.status.Wor,
    },
  ];

  return (
    <>
      <Card className='h-full w-[140px] shadow-none'>
        <table className='w-[140px] table-auto text-left rounded-t-xl'>
          <thead>
            <tr>
              <th
                key='skill-ability'
                className='w-[140px] border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tl-xl pr-0'
              >
                <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                  {'기술적 능력'}
                </Typography>
              </th>
              <th key='skill-blank' className='w-[0px] border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tr-xl'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                ></Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {SKILL_ROWS.map(({ name, abil }, index) => {
              const isLast = index === SKILL_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={name}>
                  <td className={`${classes} w-[100px] pr-[0px]`}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {name}
                    </Typography>
                  </td>
                  <td className={`${classes} w-[40px]`}>
                    <Typography variant='small' color='blue-gray' className={`font-normal ${getColorClass(abil)}`}>
                      {abil}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Card className='h-full w-[140px] shadow-none'>
        <table className='w-[140px] table-auto text-left rounded-t-xl'>
          <thead>
            <tr>
              <th
                key='mental-ability'
                className='w-[140px] border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tl-xl pr-0'
              >
                <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                  {'정신적 능력'}
                </Typography>
              </th>
              <th key='mental-blank' className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tr-xl'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                ></Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {MENTAL_ROWS.map(({ name, abil }, index) => {
              const isLast = index === MENTAL_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={name}>
                  <td className={`${classes} pr-0`}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className={`font-normal ${getColorClass(abil)}`}>
                      {abil}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Card className='h-full w-[140px] shadow-none'>
        <table className='w-[140px] table-auto text-left rounded-t-xl'>
          <thead>
            <tr>
              <th
                key='physical-ability'
                className='w-[140px] border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tl-xl pr-0'
              >
                <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                  {'신체적 능력'}
                </Typography>
              </th>
              <th key='physical-blank' className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tr-xl'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                ></Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {PHYSICAL_ROWS.map(({ name, abil }, index) => {
              const isLast = index === PHYSICAL_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={name}>
                  <td className={`${classes} pr-0`}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className={`font-normal ${getColorClass(abil)}`}>
                      {abil}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default FieldPlayerDetailStat;
