// ✅ ALL IMPORTS AT TOP
import React, { useState } from "react";
import "./Destinations.css";
import PlaceDetails from "../components/PlaceDetails";  // ✅ this must be on top, not inside function

const destinations = [
  {
    id: 1,
    name: "Taj Mahal",
    locationName: "Agra, Uttar Pradesh",
    image: "/images/tajmahal.jpg",
    description: "One of the Seven Wonders — the white marble mausoleum.",
    coords: { lat: 27.1751, lng: 78.0421 },
    culture: "Mughal architecture, classical music & crafts.",
    food: ["Petha", "Mughlai Kebabs", "Bedai & Jalebi"],
  },
  {
    id: 2,
    name: "Taj Mahal",
    locationName: "Agra, Uttar Pradesh",
    image: "/images/tajmahal.jpg",
    description: "One of the Seven Wonders — the white marble mausoleum.",
    coords: { lat: 27.1751, lng: 78.0421 },
    culture: "Mughal architecture, classical music & crafts.",
    food: ["Petha", "Mughlai Kebabs", "Bedai & Jalebi"],
  },
  {
    id: 1,
    name: "Taj Mahal",
    locationName: "Agra, Uttar Pradesh",
    image: "/images/tajmahal.jpg",
    description: "One of the Seven Wonders — the white marble mausoleum.",
    coords: { lat: 27.1751, lng: 78.0421 },
    culture: "Mughal architecture, classical music & crafts.",
    food: ["Petha", "Mughlai Kebabs", "Bedai & Jalebi"],
  },
  {
    id: 1,
    name: "Taj Mahal",
    locationName: "Agra, Uttar Pradesh",
    image: "/images/tajmahal.jpg",
    description: "One of the Seven Wonders — the white marble mausoleum.",
    coords: { lat: 27.1751, lng: 78.0421 },
    culture: "Mughal architecture, classical music & crafts.",
    food: ["Petha", "Mughlai Kebabs", "Bedai & Jalebi"],
  },
  {
    id: 1,
    name: "Taj Mahal",
    locationName: "Agra, Uttar Pradesh",
    image: "/images/tajmahal.jpg",
    description: "One of the Seven Wonders — the white marble mausoleum.",
    coords: { lat: 27.1751, lng: 78.0421 },
    culture: "Mughal architecture, classical music & crafts.",
    food: ["Petha", "Mughlai Kebabs", "Bedai & Jalebi"],
  },
  // ...other destinations
];

function DestinationsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="destination-container">
      <h1 className="destination-title">Explore Destinations</h1>

      <div className="destination-grid">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="destination-card"
            onClick={() => setSelected(dest)}
          >
            <img src={dest.image} alt={dest.name} />
            <h2>{dest.name}</h2>
            <p className="location">{dest.locationName}</p>
          </div>
        ))}
      </div>

      {selected && (
        <PlaceDetails destination={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default DestinationsPage;
