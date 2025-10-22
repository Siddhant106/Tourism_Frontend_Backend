import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Travel"
        className="hero-image"
      />
      <div className="hero-text">
        <h1>Explore the World with Us 🌍</h1>
        <p>Find your next adventure today</p>
        <button className="explore-btn">Explore Now</button>
      </div>
    </div>
  );
}

export default HeroSection;
