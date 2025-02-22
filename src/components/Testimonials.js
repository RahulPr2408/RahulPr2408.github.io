import React from 'react';
import './Testimonials.css';
import Yash from "../assets/Yash.jpg";
import Soumya from "../assets/Soumya.jpg"
import Vaibhav from "../assets/Vaibhav.jpg"

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="text-center mt-5">What Our Customers Say</h2>
        <div className="row mt-5">
          {/* Testimonial 1 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">“The best restaurant”</h5>
                <p className="card-text">
                  Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.
                </p>
                <div className="testimonial-author">
                  <img
                    src={Yash}
                    alt="Sophire Robson"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Yash Trivedi</strong>
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
                <h5 className="card-title">“Simply delicious”</h5>
                <p className="card-text">
                  Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.
                </p>
                <div className="testimonial-author">
                  <img
                    src={Vaibhav}
                    alt="Matt Cannon"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Vaibhav Patil</strong>
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
                <h5 className="card-title">“One of a kind restaurant”</h5>
                <p className="card-text">
                  The culinary experience at place is first to none. The atmosphere is vibrant, the food – nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.
                </p>
                <div className="testimonial-author">
                  <img
                    src={Soumya}
                    alt="Andy Smith"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Soumya Singh</strong>
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