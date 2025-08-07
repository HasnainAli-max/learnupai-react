import React, { useEffect, useState } from 'react';
import './ThirdChart.css';

const ThirdChart = () => {
  const [active, setActive] = useState(0);
  const [invited, setInvited] = useState(0);

  useEffect(() => {
    const fetchLearnerStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/users/learner-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log('👀 Learner Stats API response:', data); // ✅ Log response

        if (response.ok) {
          setActive(data.activeLearners || 0);
          setInvited(data.inactiveLearners || 0);
        } else {
          console.error('Failed to fetch learner stats:', data.message);
        }
      } catch (err) {
        console.error('Error fetching learner stats:', err);
      }
    };

    fetchLearnerStats();
  }, []);

  const adoptionRate = invited > 0 ? Math.round((active / invited) * 100) : 0;
  const activePercentage = invited > 0 ? (active / invited) * 100 : 0;

  return (
    <div className="adoption-card">
      <div className="adoption-title">
        Adoption Rate: <br />
        <span>Active vs Invited learners</span>
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
