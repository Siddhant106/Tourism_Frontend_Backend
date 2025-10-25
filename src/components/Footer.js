import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Incredible India</h3>
          <p>
            Promoting local culture, food, festivals, and destinations.  
            Discover the true essence of India with us!
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/festivals">Festivals</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Info</h4>
          <p>Email: info@incredibleindia.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>© 2025 Incredible India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
