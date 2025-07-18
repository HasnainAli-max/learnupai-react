import React, { useState } from 'react';
import './Button.css';

const Button = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [format, setFormat] = useState('CSV');

  const togglePopup = () => setShowPopup(!showPopup);

  const closePopup = () => setShowPopup(false);

  const refreshPage = () => window.location.reload();

  const handleFormatSelect = (selected) => setFormat(selected);

  return (
    <div className="button-container">
      {/* Export Options */}
      <button className="export-button" onClick={togglePopup}>
        Export options
        <svg
          className="down-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Refresh Page */}
      <button className="refresh-button" onClick={refreshPage}>
        <svg
          className="refresh-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 4v6h6M20 20v-6h-6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 10a8 8 0 0113.657-5.657M20 14a8 8 0 01-13.657 5.657"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Refresh page
      </button>

      {/* Export Popup */}
      {showPopup && (
        <div className="popup">
          <button className="close-btn" onClick={closePopup}>×</button>
          <div className="popup-title">Select format:</div>
          <div className="format-options">
            <button
              className={`format-button ${format === 'CSV' ? 'selected' : ''}`}
              onClick={() => handleFormatSelect('CSV')}
            >
              CSV
            </button>
            <button
              className={`format-button ${format === 'PDF' ? 'selected' : ''}`}
              onClick={() => handleFormatSelect('PDF')}
            >
              PDF
            </button>
          </div>
          <button className="popup-export">Export</button>
        </div>
      )}
    </div>
  );
};

export default Button;
