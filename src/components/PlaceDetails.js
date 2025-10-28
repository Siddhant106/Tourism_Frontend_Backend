// src/components/PlaceDetails.js
import React from "react";
import "./PlaceDetail.css";
// If you plan to use Leaflet map, import Map component later (optional)

export default function PlaceDetails({ destination, onClose }) {
  if (!destination) return null;

  const { name, image, description, culture, food, locationName, coords } = destination;

  return (
    <div className="pd-overlay" onClick={onClose}>
      <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pd-close" onClick={onClose}>✕</button>

        <div className="pd-top">
          <img src={image} alt={name} className="pd-image" />
          <div className="pd-summary">
            <h2>{name}</h2>
            <p className="pd-location">{locationName}</p>
            <p className="pd-desc">{description}</p>
          </div>
        </div>

        <div className="pd-body">
          <div className="pd-section">
            <h3>Culture</h3>
            <p>{culture}</p>
          </div>

          <div className="pd-section">
            <h3>Popular Food</h3>
            <ul>
              {food.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>

          {/* Optional map placeholder — we will wire up real map if you want */}
          <div className="pd-section">
            <h3>Location</h3>
            <div className="pd-map-placeholder">
              {/* If you include react-leaflet, replace this block with MapComponent */}
              <p>Latitude: {coords.lat}, Longitude: {coords.lng}</p>
              <p>Click "Open in Google Maps" to get route directions.</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noreferrer"
                className="pd-map-link"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
