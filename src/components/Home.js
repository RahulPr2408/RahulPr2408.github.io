import React from 'react';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content text-center">
          <p>From Plate to Purpose <br />Share, Don't Waste!</p>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section container py-5">
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <p className="about-text">
              At Second Plate, we fight food insecurity and reduce food waste by
              redistributing surplus food from restaurants and retailers to those in
              need. Our goal is simple: ensure that no good food goes to waste while
              helping those who need it most.
            </p>
            <div className="mt-4">
              <button className="btn-custom-primary me-3">About Us</button>
              <button className="btn-custom-secondary">Get Coupon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;