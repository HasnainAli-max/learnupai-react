import React from "react";
import "./ThirdPlanChart.css";

const ThirdPlanChart = () => {
  const completionRate = 80;
  return (
    <div className="team-completion-card">
      <div className="header">
        <span className="title">Team members completed</span>
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
      </div>
      <div className="rate-label">
        Completion Rate: <strong>{completionRate}%</strong>
      </div>
      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${completionRate}%` }}
          >
            <span className="progress-text">{completionRate}</span>
          </div>
        </div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="dot blue"></span> Completed by team
        </div>
        <div className="legend-item">
          <span className="dot gray"></span> Incompleted by team
        </div>
      </div>
    </div>
  );
};

export default ThirdPlanChart;
