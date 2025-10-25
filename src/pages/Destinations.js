import React, { useState } from "react";
import "./Destinations.css";
import { motion } from "framer-motion"; // <-- For animation

const Destination = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const destinations = [
    {
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      image: "/images/tajmahal.jpg",
      description: "One of the Seven Wonders of the World, symbol of eternal love.",
      popularity: 5,
    },
    {
      name: "Jaipur",
      location: "Rajasthan",
      image: "/images/rajasthan.jpg",
      description: "The Pink City known for its forts, palaces, and culture.",
      popularity: 4,
    },
    {
      name: "Varanasi",
      location: "Uttar Pradesh",
      image: "/images/varanasi.jpg",
      description: "Spiritual capital of India, famous for Ganga Aarti.",
      popularity: 3,
    },
    {
      name: "Goa",
      location: "Goa",
      image: "/images/goa.jpg",
      description: "Beaches, nightlife, and Portuguese architecture.",
      popularity: 5,
    },
    {
      name: "Kerala",
      location: "Kerala",
      image: "/images/kerala.jpg",
      description: "Backwaters, lush greenery, and cultural richness.",
      popularity: 4,
    },
  ];

  const filtered = destinations
    .filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "popularity") return b.popularity - a.popularity;
      return 0;
    });

  return (
    <div className="destination-container">
      <h1 className="destination-title">Explore Destinations 🏝️</h1>

      <div className="destination-controls">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="popularity">Sort by Popularity</option>
        </select>
      </div>

      <div className="destination-grid">
        {filtered.length > 0 ? (
          filtered.map((dest, index) => (
            <motion.div
              key={index}
              className="destination-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={dest.image} alt={dest.name} />
              <h2>{dest.name}</h2>
              <p>{dest.location}</p>
              <p className="desc">{dest.description}</p>
              <span className="rating">⭐ {dest.popularity}/5</span>
            </motion.div>
          ))
        ) : (
          <p className="no-results">No destinations found 😕</p>
        )}
      </div>
    </div>
  );
};

export default Destination;
