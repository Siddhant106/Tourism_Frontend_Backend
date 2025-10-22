import React from "react";
import "./Festivals.css";

function Festival() {
  const festivals = [
    {
      name: "Diwali",
      image: "https://images.unsplash.com/photo-1604161499797-4c50be525c1d",
      description:
        "Festival of Lights, celebrated with diyas, sweets, and fireworks across India.",
      month: "October - November",
    },
    {
      name: "Holi",
      image: "https://images.unsplash.com/photo-1583142305728-cdcb402031fd",
      description:
        "Festival of Colors, celebrating love and the arrival of spring with colors and joy.",
      month: "March",
    },
    {
      name: "Durga Puja",
      image: "https://images.unsplash.com/photo-1632924763649-1b77790a4f27",
      description:
        "A grand celebration in honor of Goddess Durga, with pandals, music, and devotion.",
      month: "September - October",
    },
    {
      name: "Eid al-Fitr",
      image: "https://images.unsplash.com/photo-1592621385612-4d7129426393",
      description:
        "Marks the end of Ramadan with prayers, feasts, and giving to the needy.",
      month: "May - June",
    },
    {
      name: "Christmas",
      image: "https://images.unsplash.com/photo-1543709539-00b05fd8b9b9",
      description:
        "Celebrated by Christians across India with decorations, church services, and gifts.",
      month: "December",
    },
  ];

  return (
    <div className="festival-container">
      <h1>Indian Festivals 🎊</h1>
      <p className="intro-text">
        India is a land of diverse cultures and traditions. Each festival reflects unity,
        happiness, and celebration. Explore some of the most beautiful festivals below.
      </p>

      <div className="festival-grid">
        {festivals.map((fest, index) => (
          <div className="festival-card" key={index}>
            <img src={fest.image} alt={fest.name} />
            <div className="festival-info">
              <h2>{fest.name}</h2>
              <p>{fest.description}</p>
              <span className="month">{fest.month}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Festival;
