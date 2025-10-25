import React, { useState } from "react";
import "./Review.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    { name: "Amit Sharma", place: "Taj Mahal, Agra", rating: 5, text: "Absolutely beautiful! A must-visit historical place." },
    { name: "Neha Verma", place: "Goa Beach", rating: 4, text: "Perfect for relaxation and sunsets. Loved the vibe!" },
    { name: "Rahul Singh", place: "Jaipur", rating: 5, text: "The pink city is full of life and heritage." },
  ]);

  const [form, setForm] = useState({ name: "", place: "", text: "", rating: 0 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.text || !form.place) return alert("Please fill all fields");
    setReviews([...reviews, form]);
    setForm({ name: "", place: "", text: "", rating: 0 });
  };

  return (
    <div className="reviews-page">
      <h1 className="reviews-heading">Traveler Reviews ✈️</h1>

      <div className="review-form">
        <h2>Write Your Review</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
          <input type="text" name="place" placeholder="Place Visited" value={form.place} onChange={handleChange} />
          <textarea name="text" placeholder="Write your experience..." value={form.text} onChange={handleChange}></textarea>
          <select name="rating" value={form.rating} onChange={handleChange}>
            <option value="0">Rating ⭐</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="reviews-list">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <h3>{r.name}</h3>
            <p className="place">📍 {r.place}</p>
            <p className="text">“{r.text}”</p>
            <p className="rating">⭐ {r.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
