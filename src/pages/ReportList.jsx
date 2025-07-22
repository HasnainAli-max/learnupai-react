import React, { useState, useRef, useEffect } from "react";
import "./ReportList.css";

const ReportList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAudience, setFilterAudience] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedScheduleRow, setSelectedScheduleRow] = useState(null);
  const filterBtnRef = useRef();
  const filterDropdownRef = useRef();

  const rows = [
    { name: 'Report Name here', date: '06.15.2025', audience: 'Sales Team', metrics: '85% Complete\n70% Pass rate' },
    { name: 'Quarterly Review', date: '05.10.2025', audience: 'Marketing', metrics: '90% Complete\n80% Pass rate' },
    { name: 'Annual Summary', date: '01.01.2025', audience: 'Executives', metrics: '100% Complete\n95% Pass rate' },
    { name: 'Weekly Update', date: '06.01.2025', audience: 'Sales Team', metrics: '75% Complete\n60% Pass rate' },
    { name: 'Performance Report', date: '04.20.2025', audience: 'HR', metrics: '88% Complete\n85% Pass rate' },
    { name: 'Engagement Stats', date: '03.15.2025', audience: 'Marketing', metrics: '92% Complete\n78% Pass rate' },
    { name: 'Compliance', date: '02.28.2025', audience: 'Executives', metrics: '99% Complete\n99% Pass rate' },
    { name: 'Monthly Recap', date: '05.30.2025', audience: 'HR', metrics: '80% Complete\n70% Pass rate' },
    { name: 'Pipeline Overview', date: '06.10.2025', audience: 'Sales Team', metrics: '85% Complete\n75% Pass rate' }
  ];

  const filteredRows = rows.filter(row => {
    const matchAudience = filterAudience ? row.audience === filterAudience : true;
    const term = searchTerm.trim().toLowerCase();
    const matchSearch = term
      ? row.name.toLowerCase().includes(term) ||
        row.date.toLowerCase().includes(term) ||
        row.audience.toLowerCase().includes(term) ||
        row.metrics.toLowerCase().includes(term)
      : true;
    return matchAudience && matchSearch;
  });

  const handleClickOutside = (e) => {
    if (
      filterDropdownRef.current &&
      filterBtnRef.current &&
      !filterDropdownRef.current.contains(e.target) &&
      !filterBtnRef.current.contains(e.target)
    ) {
      setShowFilterDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="report-list-wrapper">
      <div className="title-row">
        <div className="list-title">List Of Reports 
        <div className="tooltip-wrapper">
          <span className="tooltip-icon">?</span>
          <div className="tooltip-text">This is a tooltip</div>
        </div>
        </div>
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="2" />
                <line x1="14.5" y1="14.5" x2="18" y2="18" stroke="#888" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span> */}
          </div>
          <div className="filter-wrapper" ref={filterBtnRef}>
            <button onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
              <img src="assets/Filter_alt.png" alt="" style={{ marginRight: "10px" }} />
              Add Filters <span style={{ color: "#7795FF", marginLeft: "10px" }}>+</span>
            </button>
            {showFilterDropdown && (
              <div className="filter-dropdown" ref={filterDropdownRef}>
                <label><strong>Audience</strong></label>
                <select value={filterAudience} onChange={(e) => setFilterAudience(e.target.value)}>
                  <option value="">All</option>
                  <option value="Sales Team">Sales Team</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Executives">Executives</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            )}
            {filterAudience && (
              <button onClick={() => setFilterAudience("")}>Clear Filter</button>
            )}
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Report name</th>
              <th>Date generated</th>
              <th>Audience</th>
              <th>Key metrics summary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, i) => (
              <tr key={i}>
                <td><input type="checkbox" /></td>
                <td>{row.name}</td>
                <td>{row.date}</td>
                <td>{row.audience}</td>
                <td className="metrics" dangerouslySetInnerHTML={{ __html: row.metrics.replace(/\n/g, "<br>") }} />
                <td>
                  <button className="export-btn" onClick={() => {
                    setSelectedScheduleRow(i);
                    setShowScheduleModal(true);
                  }}>
                    Export options ▼
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showScheduleModal && (
        <div className="schedule-modal-overlay">
          <div className="schedule-modal">
            <button className="close-btn" onClick={() => setShowScheduleModal(false)}>&times;</button>
            <div className="schedule-title">Schedule</div>

            <div className="schedule-field">
              <label>Schedule</label>
              <select>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div className="schedule-field">
              <label>Day of week *</label>
              <div className="day-select">
                <span className="day-chip">Wednesday <span className="remove">×</span></span>
                <span className="day-chip">Saturday <span className="remove">×</span></span>
                <span className="day-chip">Monday <span className="remove">×</span></span>
                <select>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>
            </div>

            <div className="schedule-field">
              <label>Time of day *</label>
              <div className="time-row">
                <select>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                </select>
                <span>CST ▼</span>
              </div>
            </div>

            <div className="schedule-desc">
              Reports are scheduled to send every week on Wednesday, Saturday and Monday at 11:00 AM CST.
            </div>

            <button className="save-btn">Save settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList;