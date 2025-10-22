import React from "react";
import "./Gallery.css";

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1598153361384-8e8c9d4a37d1",
    "https://images.unsplash.com/photo-1548013146-72479768bada",
    "https://images.unsplash.com/photo-1578894381163-e72c17f4f78e",
    "https://images.unsplash.com/photo-1563919128497-6c3c642e4e0b",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

  ];

  return (
    <div className="gallery-container">
      <h1>Explore India's Beauty</h1>
      <div className="image-grid">
        {images.map((img, index) => (
          <img key={index} src={img} alt="Tourist place" />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
