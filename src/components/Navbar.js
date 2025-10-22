import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo-section">
        <h2 className="logo">Explore<span>India</span></h2>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search destinations, festivals, or food..." />
        <button>🔍</button>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations" className="nav-link">Destinations</Link>
        <Link to="/festival" className="nav-link">Festivals</Link>
        <Link to="/review">Review</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Profile / Login Section */}
      <div className="user-section">
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
