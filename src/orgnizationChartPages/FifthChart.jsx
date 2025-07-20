import React, { useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './FifthChart.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const FifthChart = () => {
  const [viewMode, setViewMode] = useState('learner'); // 'learner' | 'team' | 'both'

  const baseLabels = ['Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const learnerData = [15, 15,30, 10, 5, 25, 20];
  const teamData = [10, 20, 20, 15, 18, 10, 9];

  const datasets = [];

  if (viewMode === 'learner' || viewMode === 'both') {
    datasets.push({
      label: 'Average time spent /learner',
      data: learnerData,
      borderColor: '#7795FF',
      backgroundColor: '#7795FF',
      tension: 0.3,
      pointRadius: 6,
      pointHoverRadius: 6,
      borderWidth: 2,
    });
  }

  if (viewMode === 'team' || viewMode === 'both') {
    datasets.push({
      label: 'Average time spent /team',
      data: teamData,
      borderColor: '#7795FF',
      backgroundColor: '#7795FF',
      tension: 0.3,
      pointRadius: 6,
      pointHoverRadius: 6,
      borderWidth: 2,
    });
  }

  const chartData = {
    labels: baseLabels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 35,
        ticks: {
          color: '#181A20',
          font: { size: 12 },
        },
        title: {
          display: true,
          text: 'Number of hours (h)',
          color: '#181A20',
          font: { size: 13 },
        },
        grid: {
          color: '#eaeaea',
        },
      },
      x: {
        ticks: {
          color: '#181A20',
          font: { size: 13 },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          color: '#181A20',
          font: { size: 13 },
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="tracking-chart-wrapper">
      <div className="chart-header">
        <span className="chart-title">Tracking Time, Frequency & Focus</span>
        <span className="tooltip-icon">❓</span>
        <span className="dropdown right">Daily/week ›</span>
        <span className="dropdown right">Average Time ›</span>
      </div>

      <div className="chart-body">
      <div className="checkbox-wrapper">
        <label className={`checkbox-option ${viewMode === 'learner' ? 'active' : ''}`}>
          <input
            type="checkbox"
            checked={viewMode === 'learner'}
            onChange={() => setViewMode('learner')}
          />
          Show per learner
        </label>
        <label className={`checkbox-option ${viewMode === 'team' ? 'active' : ''}`}>
          <input
            type="checkbox"
            checked={viewMode === 'team'}
            onChange={() => setViewMode('team')}
          />
          Show per total team
        </label>
        <label className={`checkbox-option ${viewMode === 'both' ? 'active' : ''}`}>
          <input
            type="checkbox"
            checked={viewMode === 'both'}
            onChange={() => setViewMode('both')}
          />
          Show both
        </label>
      </div>
        <Line data={chartData} options={chartOptions} />
        
      </div>

      
    </div>
  );
};

export default FifthChart;
