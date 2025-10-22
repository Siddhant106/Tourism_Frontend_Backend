import React from "react";
import "./Review.css";

function Review() {
  const reviews = [
    {
      name: "Aarav Sharma",
      location: "Jaipur, Rajasthan",
      img: "https://randomuser.me/api/portraits/men/51.jpg",
      comment:
        "Rajasthan was absolutely stunning! The forts, culture, and food were unforgettable.",
      rating: 5,
    },
    {
      name: "Priya Verma",
      location: "Manali, Himachal Pradesh",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      comment:
        "Loved the snow-capped mountains and cozy cafes! A must-visit for peace lovers.",
      rating: 4,
    },
    {
      name: "Rohan Gupta",
      location: "Goa, India",
      img: "https://randomuser.me/api/portraits/men/23.jpg",
      comment:
        "Goa was amazing — the beaches, sunsets, and vibes made it the perfect getaway!",
      rating: 5,
    },
  ];

  return (
    <div className="review-container">
      <h1>Traveller Reviews</h1>
      <div className="review-grid">
        {reviews.map((rev, index) => (
          <div className="review-card" key={index}>
            <img src={rev.img} alt={rev.name} />
            <h2>{rev.name}</h2>
            <p className="location">{rev.location}</p>
            <p className="comment">"{rev.comment}"</p>
            <div className="rating">
              {"⭐".repeat(rev.rating)}{" "}
              <span className="rating-num">({rev.rating}/5)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
