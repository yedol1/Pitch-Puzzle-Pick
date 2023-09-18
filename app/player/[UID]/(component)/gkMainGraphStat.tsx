import 'chart.js/auto'; // Chart.js 모든 것을 자동으로 등록
import { Radar } from 'react-chartjs-2'; // Radar 컴포넌트를 import
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

const GkMainGraphStat = (props: { playerData: any }) => {
  const { playerData } = props;
  if (!playerData || !playerData.status) {
    return null;
  }
  const labels = ['SAVE', 'DEF CONTROL', 'AERIAL GRIP', 'DISTRIBUTION', 'SPEED', 'MENTAL', 'PHYSICAL', 'ECCENTRICITY'];
  const data = [
    culGkSaveStat(playerData.status),
    culGkDefCtlStat(playerData.status),
    culGkAerStat(playerData.status),
    culGkDistStat(playerData.status),
    culGKSpdStat(playerData.status),
    culGkMentalStat(playerData.status),
    culGkPhyStat(playerData.status),
    culGkEccStat(playerData.status),
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
    <div className='flex h-[353px] justify-center'>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GkMainGraphStat;
