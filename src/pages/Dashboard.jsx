// src/pages/Dashboard.jsx
// 📊 Admin Dashboard - Shows all statistics

import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentPercentage = (count, total) => {
    if (total === 0) return 0;
    return ((count / total) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <LoadingSpinner message="Loading dashboard..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-box">
          <h2>❌ {error}</h2>
          <button onClick={fetchStats} className="retry-btn">
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const { total_reviews, sentiments, top_destinations } = stats;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📊 Analytics Dashboard</h1>
        <p>Real-time insights from ML-powered sentiment analysis</p>
        <button onClick={fetchStats} className="refresh-btn">
          🔄 Refresh Data
        </button>
      </header>

      {/* Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Reviews</h3>
            <p className="stat-number">{total_reviews}</p>
          </div>
        </div>

        <div className="stat-card positive">
          <div className="stat-icon">😊</div>
          <div className="stat-content">
            <h3>Positive</h3>
            <p className="stat-number">{sentiments.positive}</p>
            <span className="stat-percentage">
              {getSentimentPercentage(sentiments.positive, total_reviews)}%
            </span>
          </div>
        </div>

        <div className="stat-card neutral">
          <div className="stat-icon">😐</div>
          <div className="stat-content">
            <h3>Neutral</h3>
            <p className="stat-number">{sentiments.neutral}</p>
            <span className="stat-percentage">
              {getSentimentPercentage(sentiments.neutral, total_reviews)}%
            </span>
          </div>
        </div>

        <div className="stat-card negative">
          <div className="stat-icon">😞</div>
          <div className="stat-content">
            <h3>Negative</h3>
            <p className="stat-number">{sentiments.negative}</p>
            <span className="stat-percentage">
              {getSentimentPercentage(sentiments.negative, total_reviews)}%
            </span>
          </div>
        </div>
      </div>

      {/* Sentiment Distribution Chart */}
      <div className="chart-section">
        <h2>Sentiment Distribution</h2>
        <div className="sentiment-bars">
          <div className="bar-row">
            <span className="bar-label">😊 Positive</span>
            <div className="bar-track">
              <div 
                className="bar-fill positive-bar"
                style={{ width: `${getSentimentPercentage(sentiments.positive, total_reviews)}%` }}
              >
                <span className="bar-value">{sentiments.positive}</span>
              </div>
            </div>
          </div>

          <div className="bar-row">
            <span className="bar-label">😐 Neutral</span>
            <div className="bar-track">
              <div 
                className="bar-fill neutral-bar"
                style={{ width: `${getSentimentPercentage(sentiments.neutral, total_reviews)}%` }}
              >
                <span className="bar-value">{sentiments.neutral}</span>
              </div>
            </div>
          </div>

          <div className="bar-row">
            <span className="bar-label">😞 Negative</span>
            <div className="bar-track">
              <div 
                className="bar-fill negative-bar"
                style={{ width: `${getSentimentPercentage(sentiments.negative, total_reviews)}%` }}
              >
                <span className="bar-value">{sentiments.negative}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <div className="top-destinations-section">
        <h2>🏆 Top Rated Destinations</h2>
        {top_destinations.length === 0 ? (
          <p className="no-data">No data yet. Reviews will appear here!</p>
        ) : (
          <div className="destinations-list">
            {top_destinations.map((dest, index) => (
              <div key={dest._id} className="destination-item">
                <span className="rank">#{index + 1}</span>
                <div className="dest-info">
                  <h3>{dest._id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                  <p>🌟 {dest.positive_count} positive reviews</p>
                </div>
                <div className="dest-score">
                  <span className="score-badge">{dest.positive_count}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h2>📈 Quick Stats</h2>
        <div className="activity-grid">
          <div className="activity-card">
            <h4>Overall Sentiment</h4>
            <p className="activity-value">
              {sentiments.positive > sentiments.negative ? '😊 Positive' : 
               sentiments.positive < sentiments.negative ? '😞 Negative' : '😐 Neutral'}
            </p>
          </div>
          <div className="activity-card">
            <h4>Satisfaction Rate</h4>
            <p className="activity-value">
              {getSentimentPercentage(sentiments.positive, total_reviews)}%
            </p>
          </div>
          <div className="activity-card">
            <h4>Most Reviews</h4>
            <p className="activity-value">
              {top_destinations[0]?.positive_count || 0} reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;