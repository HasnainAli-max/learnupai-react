

import React from 'react';
import './SecondChart.css';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Pass Rate', 'Fail Rate'],
  datasets: [
    {
      data: [70, 30],
      backgroundColor: ['#0047ff', '#7da6ff'],
      borderWidth: 0,
      cutout: '50%',
      rotation: -90,
      circumference: 180,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const SecondChart = () => {
  return (
    <div className="semi-doughnut-container">
      <div className="chart-title">
        Average quiz Pass/Fail Rate <span className="tooltip-icon">❓</span>
      </div>
      <div className="chart-section">
        <Doughnut data={data} options={options} />
        <div className="percentage pass">70%</div>
        <div className="percentage fail">30%</div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="dot pass"></span> Pass Rate
        </div>
        <div className="legend-item">
          <span className="dot fail"></span> Fail Rate
        </div>
      </div>
    </div>
  );
};

export default SecondChart;
