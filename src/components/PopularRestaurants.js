import React from 'react';
import './PopularRestaurants.css';
// import Junoon from "../assets/Junoon.jpg";
// import Pantry from "../assets/Pantry.jpg";

const PopularRestaurants = () => {
  return (
    <section id='popular-restaurants' className="popular-restaurants-section">
      <div className="container">
        <h2 className="text-center mt-5">Popular Restaurants</h2>
        <div className="row mt-5">
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <img src="https://junoonbyaamaya.com/wp-content/uploads/2024/09/abb2ea0b1c028a32432442e29b88ae33-removebg.png" alt="Junoon by Amaya" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Junoon by Amaya</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <img src="https://junoonbyaamaya.com/wp-content/uploads/2024/09/abb2ea0b1c028a32432442e29b88ae33-removebg.png" alt="Pantry - King West" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Pantry - King West</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <img src="https://junoonbyaamaya.com/wp-content/uploads/2024/09/abb2ea0b1c028a32432442e29b88ae33-removebg.png" alt="Pantry - King West" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Pantry - King West</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <img src="https://junoonbyaamaya.com/wp-content/uploads/2024/09/abb2ea0b1c028a32432442e29b88ae33-removebg.png" alt="Pantry - King West" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Pantry - King West</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;
