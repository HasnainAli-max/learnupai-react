import React, { useEffect, useState } from 'react';
import './SecondChart.css';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SecondChart = () => {
  const [passRate, setPassRate] = useState(0);
  const [failRate, setFailRate] = useState(0);

  useEffect(() => {
    const fetchQuizStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/users/quiz-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const pass = parseFloat(data.passPercentage || 0);
          const fail = parseFloat(data.failPercentage || 0);
          setPassRate(pass);
          setFailRate(fail);
        } else {
          console.error('Failed to load quiz stats:', data.message);
        }
      } catch (err) {
        console.error('Error loading quiz stats:', err);
      }
    };

    fetchQuizStats();
  }, []);

  const chartData = {
    labels: ['Pass Rate', 'Fail Rate'],
    datasets: [
      {
        data: [passRate, failRate],
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
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="semi-doughnut-container">
      <div className="chart-title">
        Average quiz Pass/Fail Rate 
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
      </div>
      <div className="chart-section">
        <Doughnut data={chartData} options={options} />
        <div className="percentage pass">{passRate}%</div>
        <div className="percentage fail">{failRate}%</div>
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
