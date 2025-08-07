import React, { useEffect, useState } from 'react';
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

const FourthChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '% of course content completed',
        data: [],
        backgroundColor: 'rgba(0, 47, 255, 1)',
        borderRadius: 4,
        barPercentage: 0.4,
        categoryPercentage: 0.9,
      },
      {
        label: 'Progress tracking over time',
        data: [],
        backgroundColor: 'rgba(0, 74, 255, 0.4)',
        borderRadius: 4,
        barPercentage: 0.4,
        categoryPercentage: 0.9,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/users/average-completed-courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("📊 API Response:", data);

        if (res.ok) {
          const labels = Object.keys(data); // e.g., ['Mon', 'Tue', ...]
          const completed = labels.map(day => data[day].averageCourseContentCompleted);
          const progress = labels.map(day => data[day].averageProgressOverTime);

          setChartData({
            labels,
            datasets: [
              {
                label: '% of course content completed',
                data: completed,
                backgroundColor: 'rgba(0, 47, 255, 1)',
                borderRadius: 4,
                barPercentage: 0.4,
                categoryPercentage: 0.9,
              },
              {
                label: 'Progress tracking over time',
                data: progress,
                backgroundColor: 'rgba(0, 74, 255, 0.4)',
                borderRadius: 4,
                barPercentage: 0.4,
                categoryPercentage: 0.9,
              },
            ],
          });
        } else {
          console.error('Failed to fetch chart data:', data.message);
        }
      } catch (err) {
        console.error('Error fetching average completed courses data:', err);
      }
    };

    fetchChartData();
  }, []);

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

  return (
    <div className="completed-courses-chart">
      <div className="chart-header">
        <span className="title">Average completed courses</span>
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
        <span className="dropdown">Daily/week ›</span>
      </div>
      <div className="chart-body">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default FourthChart;
