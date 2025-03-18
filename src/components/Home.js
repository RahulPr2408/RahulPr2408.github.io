import React from 'react';
import './Home.css';
import Hero from './Hero'; // Import the new Hero component

const Home = () => {
  return (
    <div id="home" className="home-container">
      <div className="hero-container">
        <Hero/> {/* Hero Section with Title */}
        
        {/* About Section (Aligned to Center-Left) */}
        <div className="about-section">
          <div className="about-content">
            <p className="about-text">
              At First Plate, we fight food insecurity and reduce food waste by
              redistributing surplus food from restaurants and retailers to those in
              need. Our goal is simple: ensure that no good food goes to waste while
              helping those who need it most.
            </p>
            <div className="button-container">
              <button className="btn-custom-primary">About Us</button>
              <button className="btn-custom-secondary">Get Coupon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;