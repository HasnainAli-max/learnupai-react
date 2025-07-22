import React, { useState } from 'react';
import './PlanAnalytics.css';
import FifthChart from '../orgnizationChartPages/FifthChart';
import SecondChart from '../orgnizationChartPages/SecondChart';
import FirstPlanChart from '../PlanAnalyticsCharts/FirstPlanChart';
import ThirdPlanChart from '../PlanAnalyticsCharts/ThirdPlanChart';
import MiniFirstChart from '../PlanAnalyticsCharts/MiniFirstChart';
import MiniSecondChart from '../PlanAnalyticsCharts/MiniSecondChart';
import { ChevronDown, Maximize2, X } from 'lucide-react';

const mockData = [
  { name: 'Name Surname', dueDate: '02.21.2025', completionDate: '02.10.2025', status: 'completed', score: '9/10', feedback: 'YES' },
  { name: 'Name Surname', dueDate: '02.21.2025', completionDate: '-', status: 'inprogress', score: '-', feedback: 'NO' },
  { name: 'Name Surname', dueDate: '02.21.2025', completionDate: '02.25.2025', status: 'pastdue', score: '9/10', feedback: 'YES' },
  { name: 'Name Surname', dueDate: '02.21.2025', completionDate: '02.18.2025', status: 'completed', score: '9/10', feedback: 'YES' },
  { name: 'Name Surname', dueDate: '02.21.2025', completionDate: '02.18.2025', status: 'completed', score: '9/10', feedback: 'YES' },
  { name: 'Name Surname', dueDate: '02.21.2025', completionDate: '02.18.2025', status: 'completed', score: '9/10', feedback: 'YES' },
];

const ExpandedTable = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(mockData);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredData(
      mockData.filter(row =>
        row.name.toLowerCase().includes(value.toLowerCase()) ||
        row.dueDate.includes(value) ||
        row.completionDate.includes(value) ||
        row.status.toLowerCase().includes(value.toLowerCase()) ||
        row.score.includes(value) ||
        row.feedback.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="expanded-table">
          <div className="expanded-header">
            <div className="training-name">Training Name – Notion - Basic Level Training</div>
            <button className="close-expanded" onClick={onClose}><X size={16} /></button>
          </div>
          <div className="expanded-controls">
            <input type="text" className="search-input" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            <button className="filter-button">Add Filters +</button>
          </div>
          <table className="expanded-table-data">
            <thead>
              <tr>
                <th>Training Member Name</th>
                <th>Course Due Date</th>
                <th>Completion Date</th>
                <th>Course Status</th>
                <th>Course Score</th>
                <th>Feedback Given</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.dueDate}</td>
                  <td>{row.completionDate}</td>
                  <td><span className={`status ${row.status}`}>● {row.status.replace(/\b\w/g, c => c.toUpperCase())}</span></td>
                  <td>{row.score}</td>
                  <td>{row.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PlanAnalytics = () => {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <>
      <div className="training-header">
        <div className="training-left">
          <div className="training-title">
            Learning Plan Specific Training
            <ChevronDown size={16} className="dropdown-icon" />
          </div>
          <div className="training-members">
            Members: <span className="member-count">100</span>
          </div>
        </div>
        <div className="training-right" onClick={() => setShowExpanded(true)}>
          <span className="expand-text">Expand</span>
          <Maximize2 size={16} className="expand-icon" />
        </div>
      </div>

      <div className="card-container">
        <div className="card-row">
          <div className="card card1">
            <FirstPlanChart />
          </div>
          <div className="card card2">
            <SecondChart />
          </div>
          <div className="card card3">
            <ThirdPlanChart />
          </div>
        </div>

        <div className="card-row">
          <div className="card card5">
            <FifthChart />
          </div>
          <div className="card card4">
            <div className="minicard card6">
              <MiniFirstChart />
            </div>
            <div className="minicard card7">
              <MiniSecondChart />
            </div>
          </div>
        </div>
      </div>

      {showExpanded && <ExpandedTable onClose={() => setShowExpanded(false)} />}
    </>
  );
};

export default PlanAnalytics;