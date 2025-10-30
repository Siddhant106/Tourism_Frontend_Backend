// src/components/StarRating.jsx
// ⭐ Star Rating Component

import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating = 0, onChange, readonly = false, size = 'medium' }) => {
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'stars-small';
      case 'large': return 'stars-large';
      default: return 'stars-medium';
    }
  };

  return (
    <div className={`star-rating ${getSizeClass()} ${readonly ? 'readonly' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= (hover || rating) ? 'filled' : 'empty'}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
        >
          {star <= (hover || rating) ? '★' : '☆'}
        </button>
      ))}
      {rating > 0 && (
        <span className="rating-text">
          {rating}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;

// ============================================
// USAGE EXAMPLES:
// ============================================

// Example 1: In Review Form (editable)
// const [rating, setRating] = useState(0);
// <StarRating rating={rating} onChange={setRating} size="large" />

// Example 2: Display existing rating (readonly)
// <StarRating rating={4} readonly size="small" />

// Example 3: Show average rating
// <StarRating rating={4.5} readonly />