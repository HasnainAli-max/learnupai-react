import React, { useEffect, useState } from 'react';
import './MiniFirstChart.css';

const MiniFirstChart = () => {
  const [completionPercent, setCompletionPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletionData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/api/users/completion-percentage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('📊 API Response:', data);

        // Use the correct field: averageCompletionPercentage
        setCompletionPercent(data?.averageCompletionPercentage || 0);
      } catch (error) {
        console.error('❌ Error fetching completion percentage:', error);
        setCompletionPercent(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletionData();
  }, []);

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
        <div
          className="progress-fill"
          style={{ width: `${completionPercent}%` }}
        >
          <span className="progress-value">
            {loading ? '...' : `${completionPercent.toFixed(0)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MiniFirstChart;
