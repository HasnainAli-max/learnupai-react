import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  const [showPopup, setShowPopup] = useState(false);
  const [format, setFormat] = useState('CSV');

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/table/employee')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching employee data:', err));
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

  // ✅ PAGINATION STATE & LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedData = sortedData.slice(indexOfFirstUser, indexOfLastUser);

  const getCurrentCourses = (courses = []) => courses?.length || 0;
  const getPercentageCompleted = (percent) => `${Math.round(percent)}%`;
  const getTotalHours = (h) => h?.toFixed(1) + ' h';
  const getAverageQuizScore = (s) => isNaN(s) ? '-' : `${Math.round(s)}/10`;
  const getLastActiveDate = (date) => date ? new Date(date).toLocaleDateString() : '-';

  const togglePopup = () => setShowPopup(!showPopup);
  const closePopup = () => setShowPopup(false);
  const refreshPage = () => window.location.reload();
  const handleFormatSelect = (selected) => setFormat(selected);

  const handleExport = () => {
    const header = ['Full name', 'Courses enrolled', '% Completed', 'Current courses', 'Last active date', 'Total hours spent', 'Average quiz score', 'Past LP’s'];
    const rows = sortedData.map(row => [
      row.fullName,
      row.coursesEnrolled?.length || 0,
      getPercentageCompleted(row.percentCompleted),
      getCurrentCourses(row.currentCourses),
      getLastActiveDate(row.lastActiveDate),
      getTotalHours(row.totalHoursSpent),
      getAverageQuizScore(row.averageQuizScore),
      row.pastLPs?.join(', ')
    ]);

    if (format === 'CSV') {
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += header.join(',') + '\n';
      rows.forEach(row => {
        csvContent += row.join(',') + '\n';
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'employee_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'PDF') {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [header],
        body: rows,
      });
      doc.save('employee_data.pdf');
    }
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <div style={{ marginTop: '10px', marginLeft: '10px' }}>
          <div className="button-container">
            <button className="export-button" onClick={togglePopup}>
              Export options
              <svg className="down-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="refresh-button" onClick={refreshPage}>
              <svg className="refresh-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4v6h6M20 20v-6h-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 10a8 8 0 0113.657-5.657M20 14a8 8 0 01-13.657 5.657" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Refresh page
            </button>
            {showPopup && (
              <div className="popup">
                <button className="close-btn" onClick={closePopup}>×</button>
                <div className="popup-title">Select format:</div>
                <div className="format-options">
                  <button className={`format-button ${format === 'CSV' ? 'selected' : ''}`} onClick={() => handleFormatSelect('CSV')}>CSV</button>
                  <button className={`format-button ${format === 'PDF' ? 'selected' : ''}`} onClick={() => handleFormatSelect('PDF')}>PDF</button>
                </div>
                <button className="popup-export" onClick={handleExport}>Export</button>
              </div>
            )}
          </div>
        </div>
        <h1 style={{ fontWeight: '700', fontSize: '18px', marginLeft: '10px' }}>
          Individual Progress Tracking
          <div className="tooltip-wrapper">
            <span className="tooltip-icon">?</span>
            <div className="tooltip-text">This is a tooltip</div>
          </div>
        </h1>
      </div>

      <div className="member-table-wrapper">
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
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.fullName}</td>
                    <td>{row.coursesEnrolled} courses</td>
                    <td>{getPercentageCompleted(row.completionPercentage)}</td>
                    <td>{getCurrentCourses(row.currentCourses)}</td>
                    <td>{getLastActiveDate(row.lastActiveDate)}</td>
                    <td>{getTotalHours(row.totalHoursSpent)}</td>
                    <td>{getAverageQuizScore(row.averageQuizScore)}</td>
                    <td>{row.pastLPs?.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="pagination-controls" style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default EmployAnalytics;
