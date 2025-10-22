import React from "react";
import "./Home.css";

function Home() {
  const destinations = [
    {
      name: "Taj Mahal, Agra",
      image: "https://pixabay.com/photos/taj-mahal-tourist-attraction-tourism-4608641/",
      description: "One of the Seven Wonders of the World, symbol of love and Mughal architecture.",
    },
    {
      name: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33",
      description: "The Pink City, known for its royal palaces, forts, and vibrant culture.",
    },
    {
      name: "Varanasi, Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1600508775076-7207f37b26e9",
      description: "The spiritual capital of India, known for the Ganga ghats and divine aura.",
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
