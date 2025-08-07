// 🧠 all your existing imports stay the same...
import React, { useState, useRef, useEffect } from "react";
import "./ReportList.css";
import Button from "../components/Button";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const ReportList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAudience, setFilterAudience] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedScheduleRow, setSelectedScheduleRow] = useState(null);
  const [reports, setReports] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalSearch, setModalSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [format, setFormat] = useState("CSV");

  const filterBtnRef = useRef();
  const filterDropdownRef = useRef();

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const apiUrl = "http://localhost:5000/api/table/reports";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    const apiUrl = "http://localhost:5000/api/table/feedback";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setFeedbackData(data))
      .catch((err) => console.error("❌ API fetch error:", err));
  }, []);

  const filteredRows = reports.filter((row) => {
    const matchAudience = filterAudience ? row.audience === filterAudience : true;
    const term = searchTerm.trim().toLowerCase();
    const matchSearch = term
      ? row.reportName.toLowerCase().includes(term) ||
        new Date(row.dateGenerated).toLocaleDateString().toLowerCase().includes(term) ||
        row.audience.toLowerCase().includes(term) ||
        row.keyMetricsSummary.toLowerCase().includes(term)
      : true;
    return matchAudience && matchSearch;
  });

  // ✅ Apply pagination on filtered rows
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedRows = filteredRows.slice(indexOfFirst, indexOfLast);

  const filteredData = feedbackData
    .filter((item) =>
      item.trainingName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortAsc) return a.trainingName.localeCompare(b.trainingName);
      else return b.trainingName.localeCompare(a.trainingName);
    });

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowFeedbackModal(true);
    setModalSearch("");
  };

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

  const downloadCSV = () => {
    const csvRows = [];
    const headers = ["Report Name", "Date Generated", "Audience", "Key Metrics Summary"];
    csvRows.push(headers.join(","));

    filteredRows.forEach((row) => {
      const data = [
        row.reportName,
        new Date(row.dateGenerated).toLocaleDateString(),
        row.audience,
        row.keyMetricsSummary,
      ];
      csvRows.push(data.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "reports.csv");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const columns = ["Report Name", "Date Generated", "Audience", "Key Metrics Summary"];
    const rows = filteredRows.map((row) => [
      row.reportName,
      new Date(row.dateGenerated).toLocaleDateString(),
      row.audience,
      row.keyMetricsSummary,
    ]);
    autoTable(doc, { head: [columns], body: rows });
    doc.save("reports.pdf");
  };

  const filteredFeedbackDetails = selectedFeedback
    ? selectedFeedback.feedbacks.filter((fb) =>
        fb.toLowerCase().includes(modalSearch.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="button-container">
        <Button
          onCSVClick={downloadCSV}
          onPDFClick={downloadPDF}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          format={format}
          setFormat={setFormat}
        />
      </div>

      <div className="report-list-wrapper" style={{ marginTop: "-40px" }}>
        <div className="title-row">
          <div className="list-title">
            List Of Reports
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
                    <option value="HR Department">HR Department</option>
                    <option value="Team Leads">Team Leads</option>
                  </select>
                </div>
              )}
              {filterAudience && (
                <button onClick={() => setFilterAudience("")}>Clear Filter</button>
              )}
            </div>
          </div>
        </div>

        <div className="table-wrapper" style={{ height: "78vh" }}>
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
              {paginatedRows.map((row, i) => (
                <tr key={i}>
                  <td><input type="checkbox" /></td>
                  <td>{row.reportName.slice(0, 10)}</td>
                  <td>{new Date(row.dateGenerated).toLocaleDateString()}</td>
                  <td>{row.audience}</td>
                  <td
                    className="metrics"
                    dangerouslySetInnerHTML={{
                      __html: row.keyMetricsSummary
                        .split(/\s+/)
                        .slice(0, 1)
                        .join(" ")
                        .replace(/\n/g, "<br>")
                    }}
                  />
                  <td>
                    <button
                      className="export-btn"
                      onClick={() => {
                        setSelectedScheduleRow(i);
                        setShowScheduleModal(true);
                      }}
                    >
                      Export options ▼
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Pagination Controls */}
          <div className="pagination-controls" style={{ textAlign: "center", marginTop: "16px" }}>
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
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedFeedback && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={() => setShowFeedbackModal(false)} className="modal-close">
                <IoClose size={20} />
              </button>
            </div>
            <div className="modal-body-grid">
              <div className="modal-grid-controls">
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Search feedback"
                    className="search-input"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                  />
                  <FiSearch className="search-icon" />
                </div>
              </div>
              <div className="feedback-grid">
                {filteredFeedbackDetails.map((fb, idx) => (
                  <div className="feedback-card" key={idx}>
                    <div className="user-info">
                      <div className="avatar">FB</div>
                      <div className="user-details">
                        <strong>Feedback</strong>
                      </div>
                    </div>
                    <p className="feedback-text">{fb}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportList;
