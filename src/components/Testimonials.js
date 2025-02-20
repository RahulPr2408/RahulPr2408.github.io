import React from 'react';
import './Testimonials.css'; // Import custom CSS

const Testimonials = () => {
  return (
    <section className="testimonials-section py-5">
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
                    src="../assets/sophire-robson.jpg" // Replace with the actual image path
                    alt="Sophire Robson"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Sophire Robson</strong>
                    <cite>Los Angeles, CA</cite>
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
                    src="../assets/matt-cannon.jpg" // Replace with the actual image path
                    alt="Matt Cannon"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Matt Cannon</strong>
                    <cite>San Diego, CA</cite>
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
                    src="../assets/andy-smith.jpg" // Replace with the actual image path
                    alt="Andy Smith"
                    className="testimonial-image"
                  />
                  <div className="author-info">
                    <strong>Andy Smith</strong>
                    <cite>San Francisco, CA</cite>
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