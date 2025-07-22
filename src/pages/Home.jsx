import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
    <div className="back">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M15 6L9 12L15 18" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        Back
      </div>
    <div className="container">
      
      <div className="plan">
        <p style={{ letterSpacing: '-5%' }}>
          Create a <span className="span">Learning Plan</span>
        </p>
      </div>
      <div className="provide">
        <p>
          Provide a prompt  with your learning goals, and we’ll <br />
          generate a customized plan for you.
        </p>
      </div>
      <div className="prompt-container">
        <input
          className="prompt-textarea"
          placeholder="Type your Learning Plan prompt here or drag & drop files"
          rows="1"
        />
        <div className="icon-left">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3V15" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round"/>
  <path d="M6 12L12 18L18 12" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 21H19C20.1046 21 21 20.1046 21 19V19C21 18.4477 20.5523 18 20 18H4C3.44772 18 3 18.4477 3 19V19C3 20.1046 3.89543 21 5 21Z" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round"/>
</svg>

        </div>
        <div className="icon-right">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 15L12 9L18 15" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
      </div>
      <div className="sugession-container">
        <div className="suggession-1">Type your Learning Plan prompt here </div>
        <div className="suggession-2">LLMs and big AI Companies</div>
        <div className="suggession-3">I want to learn about SEO Marketing</div>
      </div>
    </div>
    </>

  );
};

export default Home;