import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, Bounce } from 'react-toastify';
import './PopularRestaurants.css';
import CouponImage from '../assets/coupon_code.jpg'; // Import the coupon image
import DefaultLogoImage from '../assets/restaurant-default.jpg';
import DefaultMapImage from '../assets/map-default.png';

const PopularRestaurants = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isCouponPopupOpen, setIsCouponPopupOpen] = useState(false);
  const [showCouponContent, setShowCouponContent] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]); // for standard menu
  const [comboMenu, setComboMenu] = useState(null); // for combo menu
  const [menuRefreshKey, setMenuRefreshKey] = useState(0);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurants`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
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

  // Added this new useEffect to refresh menu items periodically
  useEffect(() => {
    if (selectedRestaurant) {
      const interval = setInterval(() => {
        fetchMenuItems(selectedRestaurant._id);
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [selectedRestaurant, menuRefreshKey]);

  const openPopup = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsPopupOpen(true);
    fetchMenuItems(restaurant._id); // Fetch menu items when popup opens
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRestaurant(null);
    setShowCouponContent(false);
    setMenuItems([]); // Clear menu items when popup closes
    setComboMenu(null); // Clear combo menu when popup closes
  };

  const openCouponContent = () => {
    if (!isLoggedIn) {
      toast.error('Please login first to access and download coupons!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
      navigate('/login');
      return;
    }
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

  const fetchMenuItems = async (restaurantId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurants/${restaurantId}/menu`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Check if response is for a combo menu or standard menu
      if (data.menuType === 'combo') {
        setComboMenu(data);
        setMenuItems([]);
      } else {
        setMenuItems(data);
        setComboMenu(null);
      }
    } catch (error) {
      console.error('Could not fetch menu items:', error);
    }
  };

  // Helper function to get default image if restaurant image is not available
  const getDefaultImage = (type) => {
    if (type === 'logo') {
      return require('../assets/restaurant-default.jpg');
    } else {
      return require('../assets/map-default.png');
    }
  };

  const handleImageError = (e, type) => {
    e.target.onerror = null; // Prevent infinite loop
    const defaultImage = getDefaultImage(type);
    e.target.src = defaultImage.default;
  };

  // Function to render standard menu
  const renderStandardMenu = () => (
    <div className="menu-items">
      <h4>Second Plate Exclusive Pricing</h4>
      {menuItems.length > 0 ? (
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item._id} className={`menu-item ${!item.isAvailable ? 'out-of-stock' : ''}`}>
              <div className="menu-item-content">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price}</span>
              </div>
              {!item.isAvailable && (
                <span className="out-of-stock-badge">Out of Stock</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No menu items available.</p>
      )}
    </div>
  );

  // Function to render combo menu
  const renderComboMenu = () => (
    <div className="combo-menu">
      <h4>Second Plate Exclusive Combo Pricing</h4>
      {comboMenu && comboMenu.combos && comboMenu.combos.length > 0 ? (
        <div className="combo-menu-container">
          {/* Combo Options */}
          <div className="combo-options-list">
            {comboMenu.combos.map((combo) => (
              <div key={combo._id} className="combo-option">
                <div className="combo-header">
                  <h5>{combo.name}</h5>
                  <div className="combo-description">{combo.description}</div>
                </div>
                <div className="combo-prices">
                  <span className="combo-original-price">${combo.originalPrice.toFixed(2)}</span>
                  <span className="combo-sale-price">${combo.salePrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Protein Options */}
          {comboMenu.proteins && comboMenu.proteins.length > 0 && (
            <div className="combo-section">
              <h5>Proteins: (Choose 1 for Combo 1)</h5>
              <ul className="combo-items-list">
                {comboMenu.proteins.map((protein) => (
                  <li key={protein._id} className={!protein.isAvailable ? 'out-of-stock' : ''}>
                    {protein.name}
                    {!protein.isAvailable && (
                      <span className="out-of-stock-badge">Out of Stock</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Side Options */}
          {comboMenu.sides && comboMenu.sides.length > 0 && (
            <div className="combo-section">
              <h5>Sides: Choose 2 for Combo 1 OR Choose 3 for Combo 3</h5>
              <ul className="combo-items-list">
                {comboMenu.sides.map((side) => (
                  <li key={side._id} className={!side.isAvailable ? 'out-of-stock' : ''}>
                    {side.name}
                    {!side.isAvailable && (
                      <span className="out-of-stock-badge">Out of Stock</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No combo menu items available.</p>
      )}
    </div>
  );

  return (
    <section className="popular-restaurants-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">Our Partner Restaurants</h2>
        <div className="row justify-content-center">
          {restaurants.map((restaurant) => (
            <div className="col-md-3 mb-4" key={restaurant._id}>
              <div className="restaurant-card" onClick={() => openPopup(restaurant)}>
                <img
                  src={restaurant.logoImage || getDefaultImage('logo')}
                  alt={restaurant.name}
                  className="restaurant-image"
                  onError={(e) => { e.target.src = getDefaultImage('logo'); }}
                />
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-location">{restaurant.location}</p>
                  {restaurant.menuType === 'combo' && (
                    <span className="combo-badge">Combo Menu</span>
                  )}
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
                        src={selectedRestaurant.logoImage || getDefaultImage('logo')}
                        alt={selectedRestaurant.name}
                        className="partner-image"
                        onError={(e) => { e.target.src = getDefaultImage('logo'); }}
                      />
                      <h3 className="partner-name">{selectedRestaurant.name}</h3>
                      {selectedRestaurant.menuType === 'combo' && (
                        <span className="combo-badge">Combo Menu</span>
                      )}
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
                        src={selectedRestaurant.mapImage || getDefaultImage('map')}
                        alt="Map"
                        className="map-img"
                        onError={(e) => { e.target.src = getDefaultImage('map'); }}
                      />
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="popup-right">
                    {/* Display Menu Items based on menu type */}
                    {comboMenu ? renderComboMenu() : renderStandardMenu()}
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