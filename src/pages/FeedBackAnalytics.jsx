import React, { useState } from "react";
import { FiSearch, FiFilter, FiExternalLink } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import "./FeedBackAnalytics.css";

const feedbackData = [
  {
    name: "React Basics",
    participants: 120,
    feedbacks: 25,
    rating: "5/5 star rating",
    feedbackDetails: Array.from({ length: 12 }).map((_, i) => ({
      user: `User ${i + 1}`,
      date: `01.${10 + i}.2025`,
      score: 5,
      comment: "The training was extremely helpful and well-paced."
    }))
  },
  {
    name: "Advanced CSS",
    participants: 95,
    feedbacks: 18,
    rating: "4.5/5 star rating",
    feedbackDetails: Array.from({ length: 11 }).map((_, i) => ({
      user: `User ${i + 1}`,
      date: `01.${15 + i}.2025`,
      score: 4,
      comment: "Good examples, could use more animations section."
    }))
  },
  {
    name: "Node.js Essentials",
    participants: 85,
    feedbacks: 20,
    rating: "5/5 star rating",
    feedbackDetails: Array.from({ length: 13 }).map((_, i) => ({
      user: `User ${i + 1}`,
      date: `01.${20 + i}.2025`,
      score: 5,
      comment: "The instructor was very clear and practical."
    }))
  }
];

const FeedBackAnalytics = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalSearch, setModalSearch] = useState("");
  const [modalSortAsc, setModalSortAsc] = useState(true);

  const filteredData = feedbackData
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortAsc) return a.name.localeCompare(b.name);
      else return b.name.localeCompare(a.name);
    });

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowFeedbackModal(true);
    setModalSearch("");
  };

  const filteredFeedbackDetails = selectedFeedback
    ? selectedFeedback.feedbackDetails
        .filter((fb) =>
          fb.user.toLowerCase().includes(modalSearch.toLowerCase())
        )
        .sort((a, b) => {
          if (modalSortAsc) return a.user.localeCompare(b.user);
          else return b.user.localeCompare(a.user);
        })
    : [];

  return (

    <>
    <div className="title-row">
        <div className="list-title">List Of Reports 
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
              placeholder="Search member"
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
              <tr key={idx} className={idx % 2 === 0 ? "even" : "odd"}>
                <td>{item.name}</td>
                <td>{item.participants}</td>
                <td>{item.feedbacks}</td>
                <td>{item.rating}</td>
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
              {/* <h3>All Feedback - {selectedFeedback.name}</h3> */}
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
                    placeholder="Search member"
                    className="search-input"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                  />
                  <FiSearch className="search-icon" />
                </div>
                <button
                  className="sort-button"
                  onClick={() => setModalSortAsc(!modalSortAsc)}
                >
                  Sort <BsChevronDown />
                </button>
              </div>

              <div className="feedback-grid">
                {filteredFeedbackDetails.map((fb, idx) => (
                  <div className="feedback-card" key={idx}>
                    <div className="user-info">
                      <div className="avatar">{fb.user[0]}</div>
                      <div className="user-details">
                        <strong>{fb.user}</strong>
                        <div className="date">{fb.date}</div>
                      </div>
                      <div className="rating" style={{ color: "#083DF5" }}>
                        {"⭐".repeat(fb.score)}
                        {fb.score < 5 ? "☆" : ""}
                        <br />
                        {fb.score}/5 star rating
                      </div>
                    </div>
                    <p className="feedback-text">{fb.comment}</p>
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