import React, { useEffect, useState } from "react";
import "./ThirdPlanChart.css";

const ThirdPlanChart = () => {
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [incompletedCount, setIncompletedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/users/team-members-completed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("📊 API Response:", data);

        if (res.ok) {
          setCompletedPercentage(data.completedPercentage || 0);
          setCompletedCount(data.completedByTeam || 0);
          setIncompletedCount(data.incompletedByTeam || 0);
        } else {
          console.error("API returned error:", data);
        }
      } catch (err) {
        console.error("Failed to fetch completion data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="team-completion-card">
      <div className="header">
        <span className="title">Team members completed</span>
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This shows the percentage of team members who completed their courses.</div>
        </div>
      </div>

      <div className="rate-label">
        Completion Rate: <strong>{completedPercentage.toFixed(2)}%</strong>
      </div>

      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${completedPercentage}%` }}
          >
            <span className="progress-text">{completedCount}</span>
          </div>
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <span className="dot blue"></span> Completed by team ({completedCount})
        </div>
        <div className="legend-item">
          <span className="dot gray"></span> Incompleted by team ({incompletedCount})
        </div>
      </div>
    </div>
  );
};

export default ThirdPlanChart;
