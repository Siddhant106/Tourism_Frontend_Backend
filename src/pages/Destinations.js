import React, { useState } from "react";
import "./Destinations.css";

function Destinations() {
  const allDestinations = [
    {
      name: "Taj Mahal",
      image: "https://images.unsplash.com/photo-1580494753701-60a4345d2e34",
      location: "Agra, Uttar Pradesh",
      region: "North",
      description: "A symbol of eternal love and one of the Seven Wonders of the World.",
    },
    {
      name: "Jaipur",
      image: "https://images.unsplash.com/photo-1603262110263-fb5d4b1a9a4c",
      location: "Rajasthan",
      region: "West",
      description: "Known as the Pink City, famous for palaces, forts, and culture.",
    },
    {
      name: "Kerala Backwaters",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      location: "Alleppey, Kerala",
      region: "South",
      description: "Peaceful backwaters surrounded by palm trees and houseboats.",
    },
    {
      name: "Darjeeling",
      image: "https://images.unsplash.com/photo-1571748982641-72c8ae76b389",
      location: "West Bengal",
      region: "East",
      description: "Hill station known for tea gardens and views of Mount Kanchenjunga.",
    },
    {
      name: "Leh-Ladakh",
      image: "https://images.unsplash.com/photo-1533110969168-7d38b6f1b2b9",
      location: "Jammu & Kashmir",
      region: "North",
      description: "Adventure destination with stunning landscapes and monasteries.",
    },
    {
      name: "Goa",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      location: "Goa",
      region: "West",
      description: "Beaches, nightlife, and Portuguese heritage — India’s party capital.",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filteredDestinations =
    filter === "All"
      ? allDestinations
      : allDestinations.filter((dest) => dest.region === filter);

  return (
    <div className="destinations-container">
      <h1>Explore Indian Destinations 🏞️</h1>
      <p className="intro">
        Choose a region to explore its famous tourist attractions.
      </p>

      <div className="filter-buttons">
        {["All", "North", "South", "East", "West"].map((region) => (
          <button
            key={region}
            onClick={() => setFilter(region)}
            className={filter === region ? "active" : ""}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="dest-grid">
        {filteredDestinations.map((dest, index) => (
          <div className="dest-card" key={index}>
            <img src={dest.image} alt={dest.name} />
            <div className="dest-info">
              <h2>{dest.name}</h2>
              <p className="location">{dest.location}</p>
              <p className="desc">{dest.description}</p>
              <span className="region-tag">{dest.region}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
