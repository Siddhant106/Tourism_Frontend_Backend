// src/components/LoadingSpinner.jsx
// 🔥 Reusable loading spinner component

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className="spinner-overlay">
      <div className={`spinner-container ${size}`}>
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {message && <p className="spinner-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;

// ============================================
// USAGE EXAMPLES:
// ============================================

// Example 1: In ReviewForm
// import LoadingSpinner from './LoadingSpinner';
// {loading && <LoadingSpinner message="Analyzing sentiment..." />}

// Example 2: In ReviewList
// {loading && <LoadingSpinner message="Loading reviews..." size="small" />}

// Example 3: Full page loading
// {loading && <LoadingSpinner message="Please wait..." size="large" />}