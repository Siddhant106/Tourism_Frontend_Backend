// src/components/ReviewForm.jsx
// 🔥 User review submit karega aur ML sentiment dikhaega

import React, { useState } from 'react';
import { submitReview } from '../services/api';
import './ReviewForm.css'; // CSS file (niche di hai)

const ReviewForm = ({ destinationId, onReviewAdded }) => {
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!review.trim()) {
      alert('Please write a review!');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await submitReview({
        destination_id: destinationId,
        review: review,
        user_name: userName || 'Anonymous'
      });

      // Show result with sentiment
      setResult(data.review);
      
      // Notify parent component to refresh reviews
      if (onReviewAdded) {
        onReviewAdded();
      }
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setReview('');
        setUserName('');
        setResult(null);
      }, 3000);
      
    } catch (error) {
      alert('❌ Error submitting review. Please try again!');
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
    <div className="review-form-container">
      <h3>✍️ Write Your Review</h3>
      
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Your Name (optional)"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="form-input"
        />
        
        <textarea
          placeholder="Share your experience about this destination..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          rows="5"
          className="form-textarea"
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? '⏳ Analyzing Sentiment...' : '📝 Submit Review'}
        </button>
      </form>

      {/* 🎉 Show ML Result */}
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
            <p>
              <strong>Sentiment:</strong> 
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
  );
};

export default ReviewForm;