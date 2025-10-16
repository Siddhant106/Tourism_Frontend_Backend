import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Welcome to Incredible India</h1>
        <p className="text-center text-muted">
          Explore the beauty, culture, and festivals of India.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
