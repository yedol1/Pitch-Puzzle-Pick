import { Typography, Card } from '@material-tailwind/react';
import { getColorClass } from '@/app/lib/hook';

const GkDetailStat = (props: { playerData: any }) => {
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
  //   Wor: 활동
  // 1v1: 1대1
  // Tec: 기술
  // Fin: 결정
  // Kic: 골킥
  // Thr: 스로잉
  // OtB: 오프 더 볼
  // Aer: Aer (이 부분은 해당 영어 단어가 무엇을 의미하는지 명확하지 않아서 그대로 두었습니다.)
  // Bal: 균형
  // Ecc: 기행
  // Bra: 대담
  // TRO: 돌진하는 경향
  // Dri: 돌파
  // Ldr: 리더십
  // Str: 몸싸움
  // Agi: 민첩
  // Ref: 반사
  // Fir: 트랩
  // Han: 핸들
  // Pos: 위치
  // Com: 조율
  // Acc: 순간 속도
  // Det: 승부
  // Vis: 시야
  // Ant: 예측
  // Mar: 마크
  // LTh: 스로인
  // Agg: 적극
  // Jum: 점프
  // Pac: 주력
  // Lon: 롱슛
  // Sta: 지구
  // Cnt: 집중
  // Fla: 천재
  // Cmp: 침착
  // Cor: 코너
  // Cro: 크로스
  // Nat: 타고난 체력
  // Tck: 태클
  // Tea: 팀워크
  // Dec: 판단
  // Pas: 패스
  // Pun: 펀칭 빈도
  // Cmd: 장악
  // Pen: PK
  // Fre: 프리
  // Hea: 헤더
  const SKILL_ROWS = [
    {
      name: '1:1 방어',
      abil: playerData.status.One,
    },
    {
      name: '골킥',
      abil: playerData.status.Kic,
    },
    {
      name: '공던지기',
      abil: playerData.status.Thr,
    },
    {
      name: '공중 장악력',
      abil: playerData.status.Aer,
    },
    {
      name: '기행',
      abil: playerData.status.Ecc,
    },
    {
      name: '돌진(빈도)',
      abil: playerData.status.TRO,
    },
    {
      name: '반사 신경',
      abil: playerData.status.Ref,
    },
    {
      name: '볼 핸들링',
      abil: playerData.status.Han,
    },
    {
      name: '수비 조율',
      abil: playerData.status.Com,
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
      name: '펀칭 빈도',
      abil: playerData.status.Pun,
    },
    {
      name: '박스 장악력',
      abil: playerData.status.Cmd,
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

export default GkDetailStat;
