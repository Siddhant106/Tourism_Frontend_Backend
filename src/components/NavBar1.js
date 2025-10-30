// src/components/NavBar1.js
// 🔥 Original Theme Maintained + Dashboard & Auth Added

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Logo Section - Original */}
      <div className="logo-section">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 className="logo">Explore<span>India</span></h2>
        </Link>
      </div>

      {/* Search Bar - Original */}
      <div className="search-bar">
        <input type="text" placeholder="Search destinations, festivals, or food..." />
        <button>🔍</button>
      </div>

      {/* Navigation Links - Original + Dashboard Added */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations" className="nav-link">Destinations</Link>
        <Link to="/festival" className="nav-link">Festivals</Link>
        <Link to="/review" className="nav-link">Review</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link> {/* ✅ NEW */}
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Profile / Login Section - Enhanced */}
      <div className="user-section">
        {user ? (
          // ✅ Logged In User
          <>
            <span className="user-greeting">Hello, {user.name.split(' ')[0]}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          // ✅ Guest User
          <Link to="/auth" style={{ textDecoration: 'none' }}>
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;