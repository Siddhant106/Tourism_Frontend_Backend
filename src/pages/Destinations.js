// src/pages/Destinations.jsx
// 🔥 UPDATED - Fixed duplicate IDs and added more destinations

import React, { useState } from "react";
import "./Destinations.css";
import PlaceDetails from "../components/PlaceDetails";

const destinations = [
  {
    id: 1, // ✅ Unique ID
    name: "Taj Mahal",
    locationName: "Agra, Uttar Pradesh",
    image: "/images/tajmahal.jpg",
    description: "One of the Seven Wonders — the white marble mausoleum built by Shah Jahan in memory of his beloved wife.",
    coords: { lat: 27.1751, lng: 78.0421 },
    culture: "Mughal architecture, classical music & crafts.",
    food: ["Petha", "Mughlai Kebabs", "Bedai & Jalebi"],
  },
  {
    id: 2, // ✅ Unique ID
    name: "Jaipur - The Pink City",
    locationName: "Jaipur, Rajasthan",
    image: "/images/jaipur.jpg",
    description: "The capital of Rajasthan, known for its stunning palaces and vibrant culture.",
    coords: { lat: 26.9124, lng: 75.7873 },
    culture: "Royal heritage, folk music & traditional arts.",
    food: ["Dal Baati Churma", "Ghewar", "Laal Maas"],
  },
  {
    id: 3, // ✅ Unique ID
    name: "Kerala Backwaters",
    locationName: "Alleppey, Kerala",
    image: "/images/kerala.jpg",
    description: "Serene network of lagoons, lakes, and canals — a houseboat paradise.",
    coords: { lat: 9.4981, lng: 76.3388 },
    culture: "Kathakali dance, Ayurveda & boat races.",
    food: ["Appam & Stew", "Fish Curry", "Puttu & Kadala"],
  },
  {
    id: 4, // ✅ Unique ID
    name: "Varanasi",
    locationName: "Varanasi, Uttar Pradesh",
    image: "/images/varanasi.jpg",
    description: "One of the oldest living cities, spiritual capital on the banks of Ganges.",
    coords: { lat: 25.3176, lng: 82.9739 },
    culture: "Ancient rituals, classical music & spiritual heritage.",
    food: ["Kachori Sabzi", "Banarasi Paan", "Lassi"],
  },
  {
    id: 5, // ✅ Unique ID
    name: "Goa Beaches",
    locationName: "Goa",
    image: "/images/goa.jpg",
    description: "Sun, sand, and sea — India's beach paradise with Portuguese influence.",
    coords: { lat: 15.2993, lng: 74.1240 },
    culture: "Portuguese heritage, beach parties & water sports.",
    food: ["Fish Curry Rice", "Bebinca", "Vindaloo"],
  },
  // Add more destinations as needed...
];

function DestinationsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="destination-container">
      <h1 className="destination-title">🌏 Explore Destinations</h1>

      <div className="destination-grid">
        {destinations.map((dest) => (
          <div
            key={dest.id} // Now each has unique ID
            className="destination-card"
            onClick={() => setSelected(dest)}
          >
            <img src={dest.image} alt={dest.name} />
            <h2>{dest.name}</h2>
            <p className="location">{dest.locationName}</p>
          </div>
        ))}
      </div>

      {/* Modal with Reviews */}
      {selected && (
        <PlaceDetails 
          destination={selected} 
          onClose={() => setSelected(null)} 
        />
      )}
    </div>
  );
}

export default DestinationsPage;