// src/components/ReviewForm.jsx
// 🔥 FINAL VERSION - With Toast, Spinner, and Star Rating

import React, { useState } from 'react';
import { submitReview } from '../services/api';
import { useToast, ToastContainer } from './Toast';
import LoadingSpinner from './LoadingSpinner';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ destinationId, onReviewAdded }) => {
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);  // ⭐ NEW: Star rating
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const { toasts, addToast, removeToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!review.trim()) {
      addToast('Please write a review!', 'warning');
      return;
    }

    if (rating === 0) {
      addToast('Please select a star rating!', 'warning');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await submitReview({
        destination_id: destinationId,
        review: review,
        user_name: userName || 'Anonymous',
        rating: rating  // ⭐ Send rating to backend
      });

      setResult(data.review);
      
      addToast(
        `Review submitted! Rating: ${rating}⭐ | Sentiment: ${data.review.sentiment.toUpperCase()}`,
        'success',
        4000
      );
      
      if (onReviewAdded) {
        onReviewAdded();
      }
      
      setTimeout(() => {
        setReview('');
        setUserName('');
        setRating(0);
        setResult(null);
      }, 3000);
      
    } catch (error) {
      addToast('Failed to submit review. Please try again!', 'error');
      console.error(error);
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

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="review-form-container">
        <h3>✍️ Write Your Review</h3>
        
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-input"
            disabled={loading}
          />
          
          <textarea
            placeholder="Share your experience about this destination..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            rows="5"
            className="form-textarea"
            disabled={loading}
          />
          
          {/* ⭐ Star Rating Input */}
          <div className="rating-section">
            <label className="rating-label">Rate your experience:</label>
            <StarRating 
              rating={rating} 
              onChange={setRating}
              size="large"
              readonly={loading}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? '⏳ Analyzing...' : '📝 Submit Review'}
          </button>
        </form>

        {loading && (
          <div className="loading-overlay">
            <LoadingSpinner message="Analyzing sentiment..." size="medium" />
          </div>
        )}

        {/* 🎉 Show ML Result with Rating */}
        {result && (
          <div 
            className="sentiment-result"
            style={{ 
              borderLeft: `4px solid ${getSentimentColor(result.sentiment)}` 
            }}
          >
            <div className="sentiment-header">
              <span className="sentiment-emoji">
                {getSentimentEmoji(result.sentiment)}
              </span>
              <h4>Review Submitted Successfully!</h4>
            </div>
            
            <div className="sentiment-details">
              {/* ⭐ Display Rating */}
              <div className="result-rating">
                <strong>Your Rating:</strong>
                <StarRating rating={result.rating} readonly size="small" />
              </div>
              
              <p>
                <strong>ML Sentiment:</strong> 
                <span 
                  className="sentiment-badge"
                  style={{ 
                    backgroundColor: getSentimentColor(result.sentiment) 
                  }}
                >
                  {result.sentiment.toUpperCase()}
                </span>
              </p>
              
              <p>
                <strong>Confidence Score:</strong> 
                {(result.sentiment_score * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${result.sentiment_score * 100}%`,
                  backgroundColor: getSentimentColor(result.sentiment)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewForm;