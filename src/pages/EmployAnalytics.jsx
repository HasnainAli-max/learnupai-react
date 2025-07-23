import React, { useState, useEffect, useRef } from 'react';
import './EmployAnalytics.css';
import MemberDetailTab from '../MemberDetailTab/MemberDetailTab';

const EmployAnalytics = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [openedDetails, setOpenedDetails] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOption, setSortOption] = useState('nameAsc');
  const [showSort, setShowSort] = useState(false);
  const [data, setData] = useState([]);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/user-stats')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching employee data:', err));
  }, []);

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
    .filter(member => member.fullName.toLowerCase().includes(search.toLowerCase()))
    .filter(member => {
      if (statusFilter === 'All') return true;
      return member.currentCourses?.some(c => c.status === statusFilter);
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === 'nameAsc') return a.fullName.localeCompare(b.fullName);
    if (sortOption === 'nameDesc') return b.fullName.localeCompare(a.fullName);
    if (sortOption === 'lastActive') return new Date(b.lastActiveDate) - new Date(a.lastActiveDate);
    if (sortOption === 'coursesCount') return b.coursesEnrolled.length - a.coursesEnrolled.length;
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

  const getCurrentCourses = (courses = []) => courses?.length || 0;
  const getPercentageCompleted = (percent) => `${Math.round(percent)}%`;
  const getTotalHours = (h) => h?.toFixed(1) + ' h';
  const getAverageQuizScore = (s) => isNaN(s) ? '-' : `${Math.round(s)}/10`;
  const getLastActiveDate = (date) => date ? new Date(date).toLocaleDateString() : '-';

  return (
    <>
      <div style={{ width: '100%' }}>
        <h1 style={{ fontWeight: '700', fontSize: '18px', marginLeft: '10px' }}>
          Individual Progress Tracking
          <div className="tooltip-wrapper">
            <span className="tooltip-icon">?</span>
            <div className="tooltip-text">This is a tooltip</div>
          </div>
        </h1>
      </div>
      <div className="member-table-wrapper">
        {/* Header Tabs */}
        <div className="member-table-header">
          <div className="tabs">
            <div className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
              <svg width="30" height="30" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="12" fill="#F5F6FF" /><rect x="16" y="20" width="20" height="4" rx="2" fill="#0047FF" /><rect x="16" y="30" width="20" height="4" rx="2" fill="#0047FF" /><rect x="16" y="40" width="32" height="4" rx="2" fill="#0047FF" /><circle cx="42" cy="28" r="8" fill="#0047FF" /></svg>
              All Members
            </div>
            {openedDetails.map(id => {
              const member = data.find(m => m._id === id);
              return (
                <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
                  <span className="avatar">N</span> {member?.fullName}
                  <button className="tab-close-btn" onClick={(e) => handleCloseTab(id, e)}>×</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="controls">
          <div className="search-wrapper">
            <input type="text" placeholder="Search" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="filter-dropdown-wrapper" ref={filterRef}>
            <button className="filter-btn" onClick={() => setShowFilter(!showFilter)}>Add Filters +</button>
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
            <button className="sort-btn" onClick={() => setShowSort(!showSort)}>Sort</button>
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

        {/* Table View */}
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
                    <tr key={row._id}>
                      <td><span className="avatar">N</span>{row.fullName}</td>
                      <td>{row.coursesEnrolled?.length || 0} courses</td>
                      <td>{getPercentageCompleted(row.percentCompleted)}</td>
                      <td>{getCurrentCourses(row.currentCourses)}</td>
                      <td>{getLastActiveDate(row.lastActiveDate)}</td>
                      <td>{getTotalHours(row.totalHoursSpent)}</td>
                      <td>{getAverageQuizScore(row.averageQuizScore)}</td>
                      <td>{row.pastLPs?.join(', ')}</td>
                      <td><button className="plus-btn" onClick={() => handleOpenTab(row._id)}>+</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <MemberDetailTab member={data.find(m => m._id === activeTab)} />
        )}
      </div>
    </>
  );
};

export default EmployAnalytics;
