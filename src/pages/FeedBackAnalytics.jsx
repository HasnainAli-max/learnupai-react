import React, { useEffect, useState } from "react";
import { FiSearch, FiExternalLink } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./FeedBackAnalytics.css";
import Button from "../components/Button";

const mockFeedbacks = [
  {
    name: "Alice Johnson",
    date: "03.01.2025",
    rating: 4.2,
    feedback: "Great session! The pace was just right and the examples were relevant.",
  },
  {
    name: "Michael Lee",
    date: "03.02.2025",
    rating: 5.0,
    feedback: "Exceptional training! Learned a lot and loved the hands-on approach.",
  },
  {
    name: "Priya Kumar",
    date: "03.03.2025",
    rating: 3.8,
    feedback: "Good content but would have liked more time on advanced topics.",
  },
  {
    name: "David Smith",
    date: "03.04.2025",
    rating: 4.7,
    feedback: "Trainer was very engaging. Clear examples and practical insights.",
  },
  {
    name: "Sophia Zhang",
    date: "03.05.2025",
    rating: 4.0,
    feedback: "Helpful course. Could be improved with more team-based case studies.",
  },
];

const FeedBackAnalytics = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalSearch, setModalSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [format, setFormat] = useState("CSV");
  const [pageRefreshed, setPageRefreshed] = useState(false);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = () => {
    const apiUrl = "http://localhost:5000/api/table/feedback";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setFeedbackData(data))
      .catch((err) => console.error("❌ API fetch error:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    if (!pageRefreshed) {
      setPageRefreshed(true);
      window.location.reload();
    }
  };

  const filteredData = feedbackData
    .filter((item) =>
      item.trainingName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortAsc) return a.trainingName.localeCompare(b.trainingName);
      else return b.trainingName.localeCompare(a.trainingName);
    });

  // ✅ Paginated data logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowFeedbackModal(true);
    setModalSearch("");
  };

  const handleExport = () => {
    const header = [["Training name", "Nr. of participants", "Nr. of feedbacks", "Average star rating"]];
    const rows = filteredData.map((item) => [
      item.trainingName,
      item.participants,
      item.feedbackCount,
      item.averageStarRating,
    ]);

    if (format === "CSV") {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += header[0].join(",") + "\n";
      rows.forEach((row) => {
        csvContent += row.join(",") + "\n";
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "feedback_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "PDF") {
      const doc = new jsPDF();
      autoTable(doc, { head: header, body: rows });
      doc.save("feedback_data.pdf");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          position: "relative",
          marginTop: "-30px",
        }}
      >
        <h2>List Of Reports</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="export-button" onClick={() => setShowPopup(!showPopup)}>
            Export Options
            <svg className="down-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="refresh-btn" onClick={handleRefresh}>
            <svg className="refresh-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4v6h6M20 20v-6h-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 10a8 8 0 0113.657-5.657M20 14a8 8 0 01-13.657 5.657" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Refresh Page
          </button>
        </div>

        {showPopup && (
          <div className="export-popup">
            <div className="popup-header">
              <div>Select format:</div>
              <IoClose style={{ cursor: "pointer" }} onClick={() => setShowPopup(false)} />
            </div>

            <div className="popup-buttons">
              <button className={`format-btn ${format === "CSV" ? "active" : ""}`} onClick={() => setFormat("CSV")}>
                CSV
              </button>
              <button className={`format-btn ${format === "PDF" ? "active" : ""}`} onClick={() => setFormat("PDF")}>
                PDF
              </button>
            </div>

            <button className="export-confirm" onClick={handleExport}>
              Export
            </button>
          </div>
        )}
      </div>

      <div className="training-container">
        <div className="top-controls">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search training"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="search-icon" />
          </div>
          <button className="sort-button" onClick={() => setSortAsc(!sortAsc)}>
            Sort <BsChevronDown />
          </button>
        </div>

        <div className="table-wrapper">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Training name</th>
                <th>Nr. of participants</th>
                <th>Nr. of feedbacks</th>
                <th>Average star rating</th>
                <th>Show all feedbacks</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => (
                <tr key={item._id} className={idx % 2 === 0 ? "even" : "odd"}>
                  <td>{item.trainingName}</td>
                  <td>{item.participants}</td>
                  <td>{item.feedbackCount}</td>
                  <td>{item.averageStarRating}</td>
                  <td className="icon-cell">
                    <button onClick={() => openModal(item)} className="feedback-btn">
                      <FiExternalLink />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        {showFeedbackModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="search-wrapper" style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Search member"
                    className="search-input"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                  />
                  <FiSearch className="search-icon" />
                </div>
                <IoClose
                  size={20}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  onClick={() => setShowFeedbackModal(false)}
                />
              </div>

              <div className="modal-body-grid">
                <div className="feedback-grid">
                  {mockFeedbacks
                    .filter((fb) =>
                      fb.name.toLowerCase().includes(modalSearch.toLowerCase())
                    )
                    .map((fb, idx) => (
                      <div className="feedback-card" key={idx}>
                        <div className="user-info">
                          <div className="avatar">{fb.name.charAt(0)}</div>
                          <div className="user-details">
                            <strong>{fb.name}</strong>
                            <span>{fb.date}</span>
                          </div>
                          <div className="stars">
                            <span>{fb.rating.toFixed(1)}★</span>
                          </div>
                        </div>
                        <p className="feedback-text">{fb.feedback}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedBackAnalytics;
