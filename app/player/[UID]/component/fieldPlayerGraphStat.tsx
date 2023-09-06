// import 부분
import 'chart.js/auto';
import { useParams } from 'next/navigation';
import { culAtkStat, culDefStat, culMentalStat, culPhyStat, culSpdStat, culTechStat } from '@/app/lib/hook';
import { useFetchSelectedPlayer } from '@/app/lib/reactQuery/useFetchSelectedPlayer';
import { Radar } from 'react-chartjs-2';

const FieldPlayerGraphStat = () => {
  const params = useParams();
  const uid = Number(params.UID);
  const { data: playerData, isLoading, error: playerError } = useFetchSelectedPlayer(uid);

  if (isLoading) return <div>loading...</div>;

  const labels = ['ATTACK', 'DEFENCE', 'TECHNICAL', 'SPEED', 'PHYSICAL', 'MENTAL'];
  const data = [
    culAtkStat(playerData.status),
    culDefStat(playerData.status),
    culTechStat(playerData.status),
    culSpdStat(playerData.status),
    culPhyStat(playerData.status),
    culMentalStat(playerData.status),
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `주요스탯 ( 0~100 )`,
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 25,
          display: false,
        },
      },
    },
  };

  return (
    <div className='flex h-[268px] justify-center'>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default FieldPlayerGraphStat;
