import React, { useState, useEffect } from 'react';
import './PopularRestaurants.css';
import Amaya_Logo from '../assets/amaya-logo.png';
import Pantry_Logo from '../assets/pantry-logo.png';
import Amaya_Menu from '../assets/amaya-menu.jpeg';
import Amaya_Map from '../assets/Amaya_map.png';
import Pantry_Map from '../assets/map-pantry.jpg';
import CouponImage from '../assets/coupon_code.jpg'; // Import the coupon image

const PopularRestaurants = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isCouponPopupOpen, setIsCouponPopupOpen] = useState(false);
  const [showCouponContent, setShowCouponContent] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/restaurants');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Could not fetch restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const openPopup = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRestaurant(null);
    setShowCouponContent(false);
  };

  const openCouponContent = () => {
    setShowCouponContent(true);
  };

  const closeCouponContent = () => {
    setShowCouponContent(false);
  };

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = CouponImage;
    link.download = 'restaurant-coupon.jpg'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="popular-restaurants-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">Our Partner Restaurants</h2>
        <div className="row justify-content-center">
          {restaurants.map((restaurant) => (
            <div className="col-md-3 mb-4" key={restaurant._id}>
              <div className="restaurant-card" onClick={() => openPopup(restaurant)}>
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-location">{restaurant.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Menu */}
        {isPopupOpen && selectedRestaurant && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              {!showCouponContent ? (
                <div className="popup-grid">
                  {/* Left Side */}
                  <div className="popup-left">
                    <div className="restaurant-logo-info">
                      <img
                        src={selectedRestaurant.logo}
                        alt={selectedRestaurant.name}
                        className="partner-image"
                      />
                      <h3 className="partner-name">{selectedRestaurant.name}</h3>
                    </div>
                    <div className="location-info">
                      <p>
                        <strong>Located in:</strong> {selectedRestaurant.location}<br />
                        <strong>Address:</strong> {selectedRestaurant.address}<br />
                        <strong>Phone:</strong> {selectedRestaurant.phone}
                      </p>
                    </div>
                    <div className="map-image">
                      <img
                        src={selectedRestaurant.map}
                        alt="Map"
                        className="map-img"
                      />
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="popup-right">
                    <div className="menu-image">
                      <img
                        src={selectedRestaurant.menu}
                        alt="Menu"
                        className="menu-img"
                      />
                    </div>
                    <button className="btn-coupon" onClick={openCouponContent}>
                      Get Coupons
                    </button>
                  </div>
                </div>
              ) : (
                <div className="coupon-content">
                  <div className="coupon-container">
                    <img src={CouponImage} alt="Coupon" className="coupon-image" />
                    <div className="coupon-buttons">
                      <button className="download-coupon-button" onClick={handleDownload}>
                        Download Coupon
                      </button>
                      <button className="back-button" onClick={closeCouponContent}>
                        Back to Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularRestaurants;