import React from 'react';
import './FourthChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: '% of course content completed',
      data: [5, 5, 10, 15, 35, 55, 85],
      backgroundColor: 'rgba(0, 47, 255, 1)', // Deep blue
      borderRadius: 4,
      barPercentage: 0.4,
      categoryPercentage: 0.9,
    },
    {
      label: 'Progress tracking over time',
      data: [10, 10, 25, 40, 40, 100, 100],
      backgroundColor: 'rgba(0, 74, 255, 0.4)', // Lighter gradient blue
      borderRadius: 4,
      barPercentage: 0.4,
      categoryPercentage: 0.9,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: true },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        boxHeight: 6,
        padding: 16,
        color: '#181A20',
        font: { size: 12 },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#181A20',
        font: { size: 13 },
      },
    },
    y: {
      grid: {
        color: '#eaeaea',
        lineWidth: 1,
      },
      ticks: {
        callback: (value) => `${value}%`,
        color: '#181A20',
        font: { size: 13 },
      },
      min: 0,
      max: 100,
    },
  },
};

const FourthChart = () => {
  return (
    <div className="completed-courses-chart">
      <div className="chart-header">
        <span className="title">Average completed courses</span>
        <span className="question-icon">❓</span>
        <span className="dropdown">Daily/week ›</span>
      </div>
      <div className="chart-body">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default FourthChart;
