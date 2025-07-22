import React from 'react';
import './MiniSecondChart.css';

const MiniSecondChart = () => {
  return (
    <div className="quiz-score-card">
      <div className="quiz-title">
        Average quiz score
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
      </div>

      <div className="quiz-description">average quiz score on completed courses</div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: '98%' }}>
          <span className="quiz-score-value">9.8</span>
        </div>
      </div>
    </div>
  );
};

export default MiniSecondChart;
