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
              <h2 className="about-us-title">About Us</h2>
              <p className="about-us-text">
                We’re on a google to fight food waste and hunger by rescuing surplus, perfectly edible food from restaurants and grocery stores. This food is transformed into nutritious, affordable meals for low- and middle-income families, students, and busy professionals.
              </p>
              <p className="about-us-text">
                A commitment to building a <strong>zero-waste future</strong> while supporting our community. By merging <strong>food waste reduction</strong> with <strong>social impact</strong>, we tackle food insecurity and promote environmental sustainability. Together, we can create a stronger, more sustainable world where no food goes to waste, and no one goes hungry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;