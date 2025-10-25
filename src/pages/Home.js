import React from "react";
import "./Home.css";

function Home() {
  const destinations = [
    {
      name: "Rishikesh, Uttarakhand",
      image: "https://i.pinimg.com/1200x/10/b8/16/10b816273afa1a1c49c7960ffe8c1637.jpg",
      description: "The Yoga Capital of the World, nestled along the Ganges River and surrounded by the Himalayas.",
    },
    {
      name: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33",
      description: "The Pink City, known for its royal palaces, forts, and vibrant culture.",
    },
    {
      name: "Rameshwaram, Tamil Nadu",
      image: "https://i.pinimg.com/1200x/51/c9/05/51c9055b784a381709507db241efbe2d.jpg",
      description: "A sacred pilgrimage town famous for its ancient temples and pristine beaches.",
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
