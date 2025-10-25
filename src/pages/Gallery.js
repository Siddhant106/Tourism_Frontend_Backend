import React from "react";
import "./Gallery.css";

const Gallery = () => {
  const images = [
    { src: "https://i.pinimg.com/1200x/05/ca/dc/05cadc833f715f017d20293f86e87e0a.jpg", title: "Taj Mahal" },
    { src: "https://i.pinimg.com/1200x/b0/d7/55/b0d75503c131cce7d0947e7b5707516c.jpg", title: "Varanasi Ghat" },
    { src: "https://i.pinimg.com/736x/f2/8d/ee/f28deed5516d14e10cc243cf65784a07.jpg", title: "Munnar" },
    { src: "https://i.pinimg.com/736x/e1/41/f1/e141f1d60de840611c1a2b22796db078.jpg", title: "Rajasthan Fort" },
    { src: "https://i.pinimg.com/1200x/11/c0/e9/11c0e9467c48ec3deec10bbad49d48c6.jpg", title: "Goa Beach" },
    { src: "https://i.pinimg.com/1200x/9e/8f/72/9e8f72aef9df62b1cf1384bdf7ff8056.jpg", title: "Valley of Flowers" },
    { src: "https://i.pinimg.com/1200x/95/a5/4a/95a54a84d166858cd2abe10bfc12a350.jpg", title: "Kashmir" },
    { src: "https://i.pinimg.com/1200x/c2/b9/41/c2b941697c9882bc51117565218ec1ff.jpg", title: "Delhi" },
    { src: "https://i.pinimg.com/1200x/d6/41/4b/d6414b87ad22feb4ee9efd2357d41cb3.jpg", title: "Gujarat" },
    { src: "https://i.pinimg.com/736x/94/50/35/945035d7744e0f5a1b23f334c2a5fd51.jpg", title: "Ujjain" },
  ];

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery of India📸</h1>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img.src} alt={img.title} />
            <div className="image-title">{img.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
