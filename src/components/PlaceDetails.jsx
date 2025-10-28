// src/components/PlaceDetails.jsx
// 🔥 UPDATED - Ab isme reviews bhi honge

import React, { useState } from 'react';
import ReviewForm from './ReviewForm';      // ✅ NEW IMPORT
import ReviewList from './ReviewList';      // ✅ NEW IMPORT
import './PlaceDetails.css';

const PlaceDetails = ({ destination, onClose }) => {
  // ✅ NEW STATE for refreshing reviews
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReviewAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Generate unique ID from destination name
  const destinationId = destination.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* ========================================
            EXISTING CONTENT (KEEP AS IS)
        ======================================== */}
        <div className="place-header">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="place-image"
          />
          <div className="place-info">
            <h2>{destination.name}</h2>
            <p className="location">📍 {destination.locationName}</p>
          </div>
        </div>

        <div className="place-body">
          {/* Description */}
          <section className="detail-section">
            <h3>🏛️ About</h3>
            <p>{destination.description}</p>
          </section>

          {/* Culture */}
          <section className="detail-section">
            <h3>🎭 Culture</h3>
            <p>{destination.culture}</p>
          </section>

          {/* Food */}
          <section className="detail-section">
            <h3>🍽️ Must-Try Foods</h3>
            <ul className="food-list">
              {destination.food.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Map (if you have coordinates) */}
          {destination.coords && (
            <section className="detail-section">
              <h3>📍 Location</h3>
              <p>Coordinates: {destination.coords.lat}, {destination.coords.lng}</p>
              {/* You can add Google Maps iframe here */}
            </section>
          )}

          {/* ========================================
              NEW SECTION - REVIEWS WITH ML
          ======================================== */}
          <section className="reviews-section">
            <div className="section-divider"></div>
            
            <h3 className="reviews-heading">💬 Visitor Reviews</h3>
            
            {/* Review Form - ML Sentiment Analysis */}
            <ReviewForm 
              destinationId={destinationId}
              onReviewAdded={handleReviewAdded}
            />
            
            {/* Review List - All Reviews */}
            <ReviewList 
              destinationId={destinationId}
              refreshTrigger={refreshTrigger}
            />
          </section>

        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;