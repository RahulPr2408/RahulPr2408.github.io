import React from 'react';
import './AboutUs.css'; // Import custom CSS

const AboutUs = () => {
  return (
    <section id='about' className="about-us-section">
      <div className="container">
        <div className="row">
          {/* Left Side: Background Image */}
          <div className="col-md-6"></div>

          {/* Right Side: Content */}
          <div className="col-md-6">
            <div className="about-us-content">
              <h2 className="about-us-title">Our Story</h2>
              <p className="about-us-text">
                We’re on a mission to fight food waste and hunger by rescuing surplus, perfectly edible food from restaurants and grocery stores. In just 60 days, <strong>126 kgs</strong> of food waste were transformed into <strong>419 nutritious meals</strong> — saving <strong>$2,500</strong> for our partner restaurants.
              </p>
              <p className="about-us-text">
                By merging food waste reduction with social impact, we tackle food insecurity, support our community, and promote sustainability. Together, we can build a future where no food goes to waste and no one goes hungry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;