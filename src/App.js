import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ yeh missing tha
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Festivals from "./pages/Festivals"; // ✅ correct file name
import Review from "./pages/Review";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";

 // ✅ correct file name
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/festival" element={<Festivals />} />
          <Route path="/review" element={<Review />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations" element={<Destinations />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
