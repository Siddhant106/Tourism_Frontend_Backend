// src/services/api.js
// 🔥 Ye file saare backend API calls handle karegi

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// ============================================
// 📥 GET REVIEWS for a destination
// ============================================
export const getReviews = async (destinationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// ============================================
// 📤 POST NEW REVIEW (with ML sentiment)
// ============================================
export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// ============================================
// 📊 GET DASHBOARD STATS
// ============================================
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

// ============================================
// EXAMPLE USAGE IN COMPONENT
// ============================================

// src/components/ReviewForm.jsx
import React, { useState } from 'react';
import { submitReview } from '../services/api';

const ReviewForm = ({ destinationId }) => {
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await submitReview({
        destination_id: destinationId,
        review: review,
        user_name: userName || 'Anonymous'
      });

      // Show result with sentiment
      setResult(data.review);
      alert(`✅ Review submitted! Sentiment: ${data.review.sentiment}`);
      
      // Reset form
      setReview('');
      setUserName('');
    } catch (error) {
      alert('❌ Error submitting review');
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

  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name (optional)"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        
        <textarea
          placeholder="Share your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          rows="4"
        />
        
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Analyzing...' : '📝 Submit Review'}
        </button>
      </form>

      {/* Show ML Result */}
      {result && (
        <div className={`result ${result.sentiment}`}>
          <h4>Your Review Sentiment: {getSentimentEmoji(result.sentiment)}</h4>
          <p>Sentiment: <strong>{result.sentiment}</strong></p>
          <p>Confidence Score: {(result.sentiment_score * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;