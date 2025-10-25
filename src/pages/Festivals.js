// src/pages/Festivals.js
import React from "react";
import "./Festivals.css";

const Festivals = () => {
  return (
    <div className="festival-page">
      <h1 className="festival-heading">Explore India’s Vibrant Festivals 🎉</h1>

      <div className="festival-grid">
        <div className="festival-card">
          <img src="https://i.pinimg.com/736x/16/57/77/1657773985c1780b68654e13f1201d8a.jpg" alt="Diwali" />
          <h2>Diwali</h2>
          <p>Festival of Lights celebrated with diyas, sweets, and family joy.</p>
        </div>

        <div className="festival-card">
          <img src="https://i.pinimg.com/736x/ed/97/0f/ed970f7997ffab10b0b96cfb6b1e6bd9.jpg" alt="Holi" />
          <h2>Holi</h2>
          <p>Festival of colors — symbol of love, unity, and happiness.</p>
        </div>

        <div className="festival-card">
          <img src="https://i.pinimg.com/1200x/60/64/31/60643104384393c07c99d328a2d703b1.jpg" alt="Navratri" />
          <h2>Navratri</h2>
          <p>Nine nights of devotion, dance, and worship of Goddess Durga.</p>
        </div>
      </div>
    </div>
  );
};

export default Festivals;
