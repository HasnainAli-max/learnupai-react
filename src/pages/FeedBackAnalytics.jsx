import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiExternalLink } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import "./FeedBackAnalytics.css";

const FeedBackAnalytics = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalSearch, setModalSearch] = useState("");
  const [modalSortAsc, setModalSortAsc] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/training-feedback")
      .then(res => res.json())
      .then(data => setFeedbackData(data))
      .catch(err => console.error("API fetch error:", err));
  }, []);

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

  // feedbacks is an array of strings (comments)
  const filteredFeedbackDetails = selectedFeedback
    ? selectedFeedback.feedbacks
        .filter((fb) =>
          fb.toLowerCase().includes(modalSearch.toLowerCase())
        )
    : [];

  return (
    <>
      <div className="title-row">
        <div className="list-title">
          List Of Reports 
          <div className="tooltip-wrapper">
            <span className="tooltip-icon">?</span>
            <div className="tooltip-text">This is a tooltip</div>
          </div>
        </div>
      </div>

      <div className="training-container">
        <div className="top-controls">
          <div className="search-filter">
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
            <button className="filter-button">
              <FiFilter /> Add Filters <span className="plus">+</span>
            </button>
          </div>
          <div>
            <button className="sort-button" onClick={() => setSortAsc(!sortAsc)}>
              Sort <BsChevronDown />
            </button>
          </div>
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
              {filteredData.map((item, idx) => (
                <tr key={item._id} className={idx % 2 === 0 ? "even" : "odd"}>
                  <td>{item.trainingName}</td>
                  <td>{item.participants}</td>
                  <td>{item.feedbackCount}</td>
                  <td>{item.averageRating}</td>
                  <td className="icon-cell">
                    <button
                      onClick={() => openModal(item)}
                      className="feedback-btn"
                    >
                      <FiExternalLink />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showFeedbackModal && selectedFeedback && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="modal-close"
                >
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
      </div>
    </>
  );
};

export default FeedBackAnalytics;
