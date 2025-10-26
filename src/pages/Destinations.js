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
      image: "https://i.pinimg.com/1200x/05/ca/dc/05cadc833f715f017d20293f86e87e0a.jpg",
      description: "One of the Seven Wonders of the World, symbol of eternal love.",
      popularity: 5,
    },
    {
      name: "Udaipur",
      location: "Rajasthan",
      image: "https://i.pinimg.com/736x/9c/4f/2c/9c4f2c33ff9079e7abafca99a53668ae.jpg",
      description: "City of Lakes, known for its royal palaces and romantic boat rides.",
      popularity: 4,
    },
    {
      name: "Spiti Valley",
      location: "Himachal Pradesh",
      image: "https://i.pinimg.com/736x/91/c6/47/91c647dc7a52ee95ce5b7a4bbaec49d2.jpg",
      description: "Remote Himalayan valley with stunning landscapes and ancient monasteries.",
      popularity: 3,
    },
    {
      name: "Goa",
      location: "Goa",
      image: "https://i.pinimg.com/736x/a1/f3/ce/a1f3cebf61eab3dbf2118001a94df593.jpg",
      description: "Beaches, nightlife, and Portuguese architecture.",
      popularity: 5,
    },
    {
      name: "Kerala",
      location: "Kerala",
      image: "https://i.pinimg.com/1200x/c0/3a/e1/c03ae10b5627ba1acd41d26e06ce7bd2.jpg",
      description: "Backwaters, lush greenery, and cultural richness.",
      popularity: 4,
    },
    {
      name: "Nasik",
      location: "Maharashtra",
      image: "https://i.pinimg.com/736x/24/c7/6f/24c76fbfa126be688bfdbba8e722e119.jpg",
      description: "spiritual city known for its vineyards and the Kumbh Mela.",
      popularity: 5,
    },
    {
      name: "Haridwar",
      location: "Uttarakhand",
      image: "https://i.pinimg.com/1200x/fd/51/a4/fd51a47d301454df285cb6d8c908580f.jpg",
      description: "Holy city on the banks of the Ganges, famous for its ghats and spiritual significance.",
      popularity: 6,
    },
    {
      name: "Lucknow",
      location: "Uttar Pradesh",
      image: "https://i.pinimg.com/1200x/a0/21/f7/a021f7867d67e3325892e7389846bcbd.jpg",
      description: "City of Nawabs, known for its rich history, culture, and delectable Awadhi cuisine.",
      popularity: 7,
    },
    {
      name: "Leh-Ladakh",
      location: "Ladakh",
      image: "https://i.pinimg.com/1200x/22/3f/c5/223fc5e34197bdaa403468f086be52af.jpg",
      description: "Breathtaking landscapes, Buddhist monasteries, and adventure activities.",
      popularity: 8,
    },
    {
      name: "Somnath Temple",
      location: "Gujarat",
      image: "https://i.pinimg.com/1200x/6a/c2/d0/6ac2d03f54c74ba10d84e4eccba6b743.jpg",
      description: "One of the twelve Jyotirlinga shrines of Lord Shiva, located on the western coast of Gujarat.",
      popularity: 9,
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
