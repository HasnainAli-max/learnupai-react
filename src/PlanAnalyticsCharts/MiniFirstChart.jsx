
import React from 'react';
import './MiniFirstChart.css';

const MiniFirstChart = () => {
  return (
    <div className="course-card">
      <div className="card-title">
        Completion % on course 
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
      </div>

      <div className="completion-label">% of course completion</div>

      <div className="progress-bar-container">
        <div className="progress-fill" style={{ width: '80%' }}>
          <span className="progress-value">80%</span>
        </div>
      </div>
    </div>
  );
};

export default MiniFirstChart;
