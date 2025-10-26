import React from "react";
import "./Home.css";

function Home() {
  const destinations = [
    {
      name: "Taj Mahal, Agra",
      image: "https://i.pinimg.com/1200x/e9/1a/b6/e91ab6d60ffd80c74e6364c96f293a84.jpg",
      description: "One of the Seven Wonders of the World, symbol of love and Mughal architecture.",
    },
    {
      name: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33",
      description: "The Pink City, known for its royal palaces, forts, and vibrant culture.",
    },
    {
      name: "Rishikesh, Uttarakhand",
      image: "https://i.pinimg.com/1200x/10/b8/16/10b816273afa1a1c49c7960ffe8c1637.jpg",
      description: "The Yoga Capital of the World, nestled in the Himalayas along the Ganges River.",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Discover the Beauty of India </h1>
          <p>Explore destinations, festivals, and local food culture from every corner of India.</p>
          <button className="explore-btn">Start Exploring</button>
        </div>
      </section>

      {/* Destination Cards */}
      <section className="destinations">
        <h2>Top Destinations</h2>
        <div className="card-container">
          {destinations.map((place, index) => (
            <div className="card" key={index}>
              <img src={place.image} alt={place.name} />
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
