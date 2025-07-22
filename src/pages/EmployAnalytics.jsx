/* ✅ EmployAnalytics.jsx - Responsive Enhancements Applied */

import React, { useState, useEffect, useRef } from 'react';
import './EmployAnalytics.css';
import data from '../data/members.json';
import MemberDetailTab from '../MemberDetailTab/MemberDetailTab';

const EmployAnalytics = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [openedDetails, setOpenedDetails] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOption, setSortOption] = useState('nameAsc');
  const [showSort, setShowSort] = useState(false);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSort(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredData = data
    .filter(member => member.name.toLowerCase().includes(search.toLowerCase()))
    .filter(member => {
      if (statusFilter === 'All') return true;
      return member.courses.some(c => c.status === statusFilter);
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === 'nameAsc') return a.name.localeCompare(b.name);
    if (sortOption === 'nameDesc') return b.name.localeCompare(a.name);
    if (sortOption === 'lastActive') {
      const getLast = (courses) => courses.map(c => new Date(c.completionDate)).filter(d => !isNaN(d)).sort((a, b) => b - a)[0] || new Date(0);
      return getLast(b.courses) - getLast(a.courses);
    }
    if (sortOption === 'coursesCount') return b.courses.length - a.courses.length;
    return 0;
  });

  const handleOpenTab = (id) => {
    if (!openedDetails.includes(id)) {
      setOpenedDetails([...openedDetails, id]);
    }
    setActiveTab(id);
  };

  const handleCloseTab = (id, e) => {
    e.stopPropagation();
    const updatedTabs = openedDetails.filter(openedId => openedId !== id);
    setOpenedDetails(updatedTabs);
    if (activeTab === id) setActiveTab('all');
  };

  const getPercentageCompleted = (courses) => {
    const completed = courses.filter(c => c.status === 'Completed').length;
    return `${Math.round((completed / courses.length) * 100)}%`;
  };

  const getCurrentCourses = (courses) => courses.filter(c => c.status === 'In progress').length;

  const getLastActiveDate = (courses) => {
    const dates = courses.map(c => new Date(c.completionDate)).filter(date => !isNaN(date));
    if (!dates.length) return '-';
    return dates.sort((a, b) => b - a)[0].toLocaleDateString();
  };

  const getTotalHours = (courses) =>
    courses.reduce((acc, c) => acc + (parseFloat(c.hoursSpent) || 0), 0).toFixed(1) + ' h';

  const getAverageQuizScore = (courses) => {
    const scores = courses.map(c => parseInt(c.score)).filter(score => !isNaN(score));
    if (!scores.length) return '-';
    const avg = scores.reduce((a, b) => a + b) / scores.length;
    return `${Math.round(avg)}/10`;
  };

  return (
    <>   
    <div className="" style={{width:'100%'}}>
<h1 style={{fontWeight:'700', fontSize:'18px', marginLeft:'10px'}}>Individual Progress Tracking
<div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
</h1>
    </div>
    <div className="member-table-wrapper">
      <div className="member-table-header">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="12" fill="#F5F6FF"/>
              <rect x="16" y="20" width="20" height="4" rx="2" fill="#0047FF"/>
              <rect x="16" y="30" width="20" height="4" rx="2" fill="#0047FF"/>
              <rect x="16" y="40" width="32" height="4" rx="2" fill="#0047FF"/>
              <circle cx="42" cy="28" r="8" fill="#0047FF"/>
            </svg>
            All Members
          </div>
          {openedDetails.map(id => {
            const member = data.find(m => m.id === id);
            return (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
                <span className="avatar">N</span> {member.name}
                <button className="tab-close-btn" onClick={(e) => handleCloseTab(id, e)} title="Close tab">×</button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="controls">
        <div className="search-wrapper">
          <input type="text" placeholder="Search " className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
          {/* <span className="search-icon">🔍</span> */}
        </div>

        <div className="filter-dropdown-wrapper" ref={filterRef}>
          <button className="filter-btn" onClick={() => setShowFilter(!showFilter)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 5H21L14 13V19L10 21V13L3 5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            Add Filters +</button>
          {showFilter && (
            <div className="filter-dropdown">
              <label>Course Status:</label>
              <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All</option>
                <option>Completed</option>
                <option>In progress</option>
                <option>Past due date</option>
              </select>
            </div>
          )}
        </div>

        <div className="filter-dropdown-wrapper" ref={sortRef}>
          <button className="sort-btn" onClick={() => setShowSort(!showSort)}>Sort 
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6L8 10L12 6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
          {showSort && (
            <div className="filter-dropdown">
              <label>Sort by:</label>
              <select className="filter-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="nameAsc">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
                <option value="lastActive">Last Active (Newest)</option>
                <option value="coursesCount">Courses Count (High to Low)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {activeTab === 'all' ? (
        <div className="table-scroll-container">
          <div className="table-responsive">
            <table className="member-table">
              <thead>
                <tr>
                  <th>Full name</th>
                  <th>Courses enrolled</th>
                  <th>% Completed</th>
                  <th>Current courses</th>
                  <th>Last active date</th>
                  <th>Total hours spent</th>
                  <th>Average quiz score</th>
                  <th>Past LP’s</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row) => (
                  <tr key={row.id}>
                    <td><span className="avatar">N</span>{row.name}</td>
                    <td>{row.courses.length} courses</td>
                    <td>{getPercentageCompleted(row.courses)}</td>
                    <td>{getCurrentCourses(row.courses)}</td>
                    <td>{getLastActiveDate(row.courses)}</td>
                    <td>{getTotalHours(row.courses)}</td>
                    <td>{getAverageQuizScore(row.courses)}</td>
                    <td>{row.pastLPs}</td>
                    <td>
                      <button className="plus-btn" onClick={() => handleOpenTab(row.id)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <MemberDetailTab member={data.find(m => m.id === activeTab)} />
      )}
    </div>
    </>
 
  );
};

export default EmployAnalytics;
