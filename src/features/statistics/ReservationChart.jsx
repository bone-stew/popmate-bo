import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatToLocalDate } from '../../app/dateTimeUtils';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function ReservationChart({ reservationCounts }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '일별 예약 인원',
      },
    },
  };

  const labels = reservationCounts.map((data) => formatToLocalDate(data.time));

  const data = {
    labels,
    datasets: [
      {
        label: '단위 : 명',
        data: reservationCounts.map((data) => data.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default ReservationChart;
