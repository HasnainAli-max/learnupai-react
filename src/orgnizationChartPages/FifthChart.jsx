import React, { useEffect, useState } from 'react';
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
  const [viewMode, setViewMode] = useState('learner');
  const [labels, setLabels] = useState([]);
  const [learnerData, setLearnerData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/users/time-frequency-focus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log('✅ API Result:', result);

        if (res.ok && result) {
          const days = Object.keys(result);
          const learner = days.map(day => result[day]?.averageShowPerLearner ?? 0);
          const team = days.map(day => result[day]?.averageShowPerTeam ?? 0);

          setLabels(days);
          setLearnerData(learner);
          setTeamData(team);
        } else {
          console.error('Invalid API response:', result);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchChartData();
  }, []);

  const datasets = [];

  if (viewMode === 'learner' || viewMode === 'both') {
    datasets.push({
      label: 'Average time spent /learner',
      data: learnerData,
      borderColor: 'rgba(0, 47, 255, 1)',
      backgroundColor: 'rgba(0, 47, 255, 1)',
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
      borderColor: 'rgba(0, 74, 255, 0.4)',
      backgroundColor: 'rgba(0, 74, 255, 0.4)',
      tension: 0.3,
      pointRadius: 6,
      pointHoverRadius: 6,
      borderWidth: 2,
    });
  }

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 35,
        ticks: {
          callback: (value) => `${value}h`,
          color: '#181A20',
          font: { size: 13 },
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
          boxWidth: 20, // Smaller dot
          padding: 18, // Space between dot and label text
          color: '#181A20',
          font: { size: 13 },
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
        <div className="tooltip-wrapper" style={{ marginLeft: '-70px', marginBottom: '7px' }}>
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
        <span className="dropdown right">Daily/week ›</span>
        <span className="dropdown right">Average Time ›</span>
      </div>

      <div className="chart-body">
        <div className="checkbox-wrapper">
          <label className={`checkbox-option ${viewMode === 'learner' ? 'active' : ''}`}>
            <input
              type="radio"
              name="viewMode"
              checked={viewMode === 'learner'}
              onChange={() => setViewMode('learner')}
            />
            Show per learner
          </label>
          <label className={`checkbox-option ${viewMode === 'team' ? 'active' : ''}`}>
            <input
              type="radio"
              name="viewMode"
              checked={viewMode === 'team'}
              onChange={() => setViewMode('team')}
            />
            Show per total team
          </label>
          <label className={`checkbox-option ${viewMode === 'both' ? 'active' : ''}`}>
            <input
              type="radio"
              name="viewMode"
              checked={viewMode === 'both'}
              onChange={() => setViewMode('both')}
            />
            Show both
          </label>
        </div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default FifthChart;
