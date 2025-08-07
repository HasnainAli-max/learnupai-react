import React, { useEffect, useState } from 'react';
import './MiniSecondChart.css';

const MiniSecondChart = () => {
  const [scoreOutOf10, setScoreOutOf10] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizScore = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/api/users/average-quiz-score', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('📊 API Response (Quiz Score):', data);

        setScoreOutOf10(data?.averageScoreOutOf10 || 0);
      } catch (error) {
        console.error('❌ Error fetching quiz score:', error);
        setScoreOutOf10(0);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizScore();
  }, []);

  const percentage = Math.min((scoreOutOf10 / 10) * 100, 100).toFixed(0); // % based on 10

  return (
    <div className="quiz-score-card">
      <div className="quiz-title">
        Average quiz score
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">Average score across all completed quizzes (out of 10)</div>
        </div>
      </div>

      <div className="quiz-description">average quiz score on completed courses</div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${percentage}%` }}>
          <span className="quiz-score-value">
            {loading ? '...' : `${scoreOutOf10.toFixed(1)} | ${percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MiniSecondChart;
