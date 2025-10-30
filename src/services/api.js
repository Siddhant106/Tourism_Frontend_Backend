// src/services/api.js
// 🔥 Backend API calls handler

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