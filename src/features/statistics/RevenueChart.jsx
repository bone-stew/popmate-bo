import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RevenueChart({ storeRevenues }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '월간 스토어별 매출',
      },
    },
  };
  const labels = storeRevenues.map((item) => item.title);
  const data = {
    labels,
    datasets: [
      {
        label: '단위 : 원',
        data: storeRevenues.map((item) => item.revenue),
        backgroundColor: '#1273E4',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default RevenueChart;
