'use client';
import { useParams, useRouter } from 'next/navigation';
import { useFetchSelectedPlayer } from '@/app/lib/reactQuery/useFetchSelectedPlayer';
import PlayerDetailInfo from '@/app/player/[UID]/(component)/playerDetailInfo';
import FieldPlayerMainStat from '@/app/player/[UID]/(component)/fieldPlayerMainStat';
import GkMainStat from '@/app/player/[UID]/(component)/gkMainStat';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Spinner } from '@material-tailwind/react';
import FieldPlayerGraphStat from '@/app/player/[UID]/(component)/fieldPlayerGraphStat';
import GkMainGraphStat from '@/app/player/[UID]/(component)/gkMainGraphStat';
import FieldPlayerDetailStat from '@/app/player/[UID]/(component)/fieldPlayerDetailStat';
import GkDetailStat from '@/app/player/[UID]/(component)/gkDetailStat';
import Image from 'next/image';

const SquadPlayerDetail = () => {
  const params = useParams();
  const uid = Number(params.UID);
  const router = useRouter();
  const { data: playerData, isLoading, error: playerError } = useFetchSelectedPlayer(uid);

  const data = ['DEFAULT', 'GRAPH'];

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner color='blue' className='w-[50px] h-[50px]' />
      </div>
    );

  return (
    playerData && (
      <section className='inline-flex justify-center items-start content-start gap-[87px] flex-wrap'>
        <h1 className='sr-only'>선수 디테일 페이지</h1>
        <div className='w-[464px] flex flex-col'>
          <div className='w-full flex flex-row items-start mb-[16px]'>
            <button onClick={() => router.back()}>
              <Image src='/back.svg' width={138} height={50} alt='뒤로가기 버튼' />
            </button>
          </div>
          <PlayerDetailInfo playerData={playerData} />
          <div className='w-[464px] h-[2px] flex-shrink-0 bg-[#F75050] mt-[10px] mb-[30px]'></div>
          {playerData.DetailedPos !== 'GK' ? (
            <Tabs value='DEFAULT'>
              <TabsHeader>
                {data.map((value) => (
                  <Tab key={value} value={value}>
                    {value}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map((value) => (
                  <TabPanel key={value} value={value}>
                    {value === 'DEFAULT' ? (
                      <FieldPlayerMainStat playerData={playerData} />
                    ) : (
                      <FieldPlayerGraphStat playerData={playerData} />
                    )}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          ) : (
            <Tabs value='DEFAULT'>
              <TabsHeader>
                {data.map((value) => (
                  <Tab key={value} value={value}>
                    {value}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map((value) => (
                  <TabPanel key={value} value={value}>
                    {value === 'DEFAULT' ? (
                      <GkMainStat playerData={playerData} />
                    ) : (
                      <GkMainGraphStat playerData={playerData} />
                    )}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          )}
        </div>
        <div className='flex p-[22px] py-[37px] items-start gap-[10px] rounded-[16.386px] bg-white shadow-custom'>
          {playerData.DetailedPos !== 'GK' ? (
            <FieldPlayerDetailStat playerData={playerData} />
          ) : (
            <GkDetailStat playerData={playerData} />
          )}
        </div>
      </section>
    )
  );
};

export default SquadPlayerDetail;
