import React from 'react';
import './ThirdChart.css';

const ThirdChart = () => {
  const active = 70;
  const invited = 200;
  const adoptionRate = Math.round((active / invited) * 100);

  const activePercentage = (active / invited) * 100;

  return (
    <div className="adoption-card">
      <div className="adoption-title">
        Adoption Rate: <br />
        <span>Active vs Invited learners</span>
        {/* <span className="tooltip-icon">❓</span> */}
      </div>

      <div className="adoption-rate-text">
        Adoption Rate: <strong>{adoptionRate}%</strong>
      </div>

      <div className="bar-container">
        <div className="invited-bar">
          <div
            className="active-bar"
            style={{ width: `${activePercentage}%` }}
          >
            <span className="bar-label left">{active}</span>
          </div>
          <span className="bar-label right">{invited}</span>
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <span className="dot active-dot"></span> Active learners
        </div>
        <div className="legend-item">
          <span className="dot invited-dot"></span> Invited learners
        </div>
      </div>
    </div>
  );
};

export default ThirdChart;
