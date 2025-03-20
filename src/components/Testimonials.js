import React from 'react';
import './Testimonials.css';
import Leo from "../assets/Leo.jpg";
import Nilima from "../assets/Nilima.png"
import Payal from "../assets/Payal.png"

const Testimonials = () => {
  return (
    <section id='testimonial' className="testimonials-section">
      <div className="container">
        <h2 className="text-center mt-5">Testimonials</h2>
        <div className="row mt-5">
          {/* Testimonial 1 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">“Helping those in need”</h5>
                <p className="card-text">
                “Second Plate introduces ways to prevent food waste which is truly impressive and helping those in need. The partner restaurant Amaya serves delicious food.”
                </p>
                <div className="testimonial-author">
                  <img
                    src={Leo}
                    alt="Sophire Robson"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Leo Francy</strong>
                    <cite>Toronto, ON</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">“Smart, sustainable approach”</h5>
                <p className="card-text">
                “Second Plate is bridging the gap between food waste and hunger with a smart, sustainable approach. Their impact is real, and their mission is truly commendable!”
                </p>
                <div className="testimonial-author">
                  <img
                    src={Payal}
                    alt="Matt Cannon"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Payal Solanki</strong>
                    <cite>Toronto, ON</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">“Mission is impactful”</h5>
                <p className="card-text">
                “Second Plate is doing incredible work by repurposing surplus food to fight hunger and reduce waste. Their mission is impactful, sustainable, and truly makes a difference in communities. Highly recommend supporting them!”
                </p>
                <div className="testimonial-author">
                  <img
                    src={Nilima}
                    alt="Andy Smith"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Nilima Gupta</strong>
                    <cite>Toronto, ON</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;