// src/App.js
// 🔥 FINAL VERSION - All enhancements included

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/NavBar1";
import Footer from "./components/Footer";
import Festivals from "./pages/Festivals";
import Review from "./pages/Review";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import Sentiment from "./pages/Sentiment";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";  // ✅ NEW: Dashboard
import Auth from "./pages/Auth";            // ✅ NEW: Login/Signup
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
          <Route path="/sentiment" element={<Sentiment />} />
          <Route path="/dashboard" element={<Dashboard />} />  {/* ✅ NEW */}
          <Route path="/auth" element={<Auth />} />            {/* ✅ NEW */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;