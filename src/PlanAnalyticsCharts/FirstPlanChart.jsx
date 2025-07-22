

import React from 'react';
import './FirshPlanChart.css';

const data = [
  { name: "Chis Emanuel Andrei", status: "Completed", score: "9/10", badge: "green" },
  { name: "Full Name and Surname", status: "In progress", score: "-", badge: "orange" },
  { name: "Chis Emanuel Andrei", status: "Past due date", score: "10/10", badge: "red" },
  { name: "Chis Emanuel Andrei", status: "Past due date", score: "8/10", badge: "red" },
];

const FirstPlanChart = () => {
  return (
    <div className="status-card">
      {data.map((item, index) => (
        <div className="status-row" key={index}>
          <div className="avatar">N</div>
          <div className="name-status">
            <div className="name">{item.name}</div>
            <div className={`badge ${item.badge}`}>{item.status}</div>
          </div>
          <div className="score">{item.score}</div>
        </div>
      ))}
    </div>
  );
};

export default FirstPlanChart;
