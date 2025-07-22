import React, { useEffect, useState } from 'react';
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

const FirstChart = () => {
  const [barThickness, setBarThickness] = useState(35);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 490) {
        setBarThickness(20);
      } else if (width <= 550) {
        setBarThickness(25);
      } else {
        setBarThickness(35);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        barThickness: barThickness,
        borderSkipped: false,
        borderWidth: 0,
      },
    ],
  };

  // Custom plugin to draw percentage text inside bar
  const textPlugin = {
    id: 'customText',
    afterDatasetsDraw(chart) {
      const {
        ctx,
        chartArea: { top },
        scales: { x, y },
      } = chart;

      chart.data.datasets[0].data.forEach((value, index) => {
        const yPos = y.getPixelForValue(index);
        const xPos = x.getPixelForValue(value);

        ctx.save();
        ctx.font = 'bold 13px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${value}%`, xPos - 10, yPos);
        ctx.restore();
      });
    },
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        min: 0,
        max: 100,
      },
      y: {
        ticks: { display: false },
        grid: { display: false, drawBorder: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="team-chart-container">
      <div className="team-chart-title">
        Team members statistics 
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
      </div>
      <div className="chart-wrapper">
        <Bar data={data} options={options} plugins={[textPlugin]} />
        <div className="y-label y-label-1">
          % of team members who have started a course
        </div>
        <div className="y-label y-label-2">
          % of team members who have completed a course
        </div>
      </div>
    </div>
  );
};

export default FirstChart;
