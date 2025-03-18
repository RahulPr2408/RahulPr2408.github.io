import React from 'react';
import './Home.css'; // Import custom CSS

const Home = () => {
  return (
    <div id='home' className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-content">
          <p className="hero-subtitle">From Plate to Purpose <br /> Share, Don't Waste!</p>
          <p className="about-text">
            At Second Plate, we fight food insecurity and reduce food waste by
            redistributing surplus food from restaurants and retailers to those in
            need. Our goal is simple: ensure that no good food goes to waste while
            helping those who need it most.
          </p>
          {/* <div className="button-container">
            <button className="btn-custom-primary-hero">About Us</button>
            <button className="btn-custom-secondary-hero">Get Coupon</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;