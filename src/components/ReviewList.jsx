// src/components/ReviewList.jsx
// 🔥 UPDATED - With star ratings display

import React, { useState, useEffect } from 'react';
import { getReviews } from '../services/api';
import StarRating from './StarRating';
import './ReviewList.css';

const ReviewList = ({ destinationId, refreshTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [destinationId, refreshTrigger]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getReviews(destinationId);
      setReviews(data.reviews || []);
    } catch (err) {
      setError('Failed to load reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentEmoji = (sentiment) => {
    switch(sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive': return '#22c55e';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="reviews-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-container">
        <div className="error-message">
          ❌ {error}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="reviews-container">
        <div className="no-reviews">
          <p>📝 No reviews yet. Be the first to review!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <h3>💬 User Reviews ({reviews.length})</h3>
      
      <div className="reviews-list">
        {reviews.map((review) => (
          <div 
            key={review._id} 
            className="review-card"
            style={{ 
              borderLeft: `4px solid ${getSentimentColor(review.sentiment)}` 
            }}
          >
            <div className="review-header">
              <div className="user-info">
                <span className="user-avatar">
                  {review.user_name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <h4>{review.user_name}</h4>
                  <span className="review-date">
                    {formatDate(review.timestamp)}
                  </span>
                </div>
              </div>
              
              <div className="sentiment-indicator">
                <span className="sentiment-emoji">
                  {getSentimentEmoji(review.sentiment)}
                </span>
                <span 
                  className="sentiment-badge"
                  style={{ 
                    backgroundColor: getSentimentColor(review.sentiment) 
                  }}
                >
                  {review.sentiment}
                </span>
              </div>
            </div>
            
            {/* ⭐ Star Rating Display */}
            {review.rating > 0 && (
              <div className="review-rating">
                <StarRating 
                  rating={review.rating} 
                  readonly 
                  size="small" 
                />
              </div>
            )}
            
            <p className="review-text">{review.review}</p>
            
            <div className="review-footer">
              <span className="confidence-score">
                🎯 ML Confidence: {(review.sentiment_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;