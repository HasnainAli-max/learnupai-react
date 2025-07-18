import React from 'react';
import './FirstChart.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const data = {
  labels: [
    '% of team members who have started a course',
    '% of team members who have completed a course',
  ],
  datasets: [
    {
      label: '',
      data: [82, 100],
      backgroundColor: ['#7da6ff', '#0047ff'],
      borderRadius: 50,
      barThickness: 35,
      borderSkipped: false,
      borderWidth: 0,
    },
  ],
};

const options = {
  indexAxis: 'y',
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      min: 0,
      max: 100,
    },
    y: {
      ticks: {
        color: '#000',
        font: {
          size: 13,
        },
        callback: function(value) {
          // Hide y-axis labels, handled by custom markup
          return '';
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
};

const FirstChart = () => {
  return (
    <div className="team-chart-container">
      <div className="team-chart-title">
        Team members statics <span className="tooltip-icon">❓</span>
      </div>
      <div className="chart-wrapper">
        <Bar data={data} options={options} width={400} height={160} />
        <div className="percent-label percent-1">82%</div>
        <div className="percent-label percent-2">100%</div>
        <div className="y-label y-label-1">% of team members who have started a course</div>
        <div className="y-label y-label-2">% of team members who have completed a course</div>
      </div>
    </div>
  );
};

export default FirstChart;