import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from "../assets/second-plate-logo-title.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLoggedIn, userName, logout } = useAuth();
  const navigate = useNavigate();
  
  const isRestaurantLoggedIn = localStorage.getItem('restaurantToken');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRestaurantLogout = () => {
    localStorage.removeItem('restaurantToken');
    navigate('/');
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar')) {
        setIsOpen(false);
      }
      if (showProfileMenu && !event.target.closest('.profile-section')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, showProfileMenu]);

  // Close mobile menu when clicking on a link
  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark custom-navbar'>
        <div className='container-fluid'>
          {/* Logo */}
          <a className='navbar-brand' href='#home'>
            <img src={logo} alt="Second Plate Logo" className="navbar-logo" />
          </a>

          {/* 🟢 Hamburger Button for iPads & Mobile */}
          <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Navigation Links (Show dropdown on mobile, normal on desktop) */}
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#home" onClick={handleNavLinkClick}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about" onClick={handleNavLinkClick}>Our Story</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team" onClick={handleNavLinkClick}>Our Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonial" onClick={handleNavLinkClick}>Testimonial</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={handleNavLinkClick}>Contact Us</a>
              </li>
            </ul>

            {/* Mobile-only profile section */}
            <div className="d-lg-none">
              {isLoggedIn ? (
                <div className="profile-section">
                  <div 
                    className="profile-trigger"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <AccountCircleIcon className="profile-icon" />
                    <span className="user-name">{userName}</span>
                  </div>
                  {showProfileMenu && (
                    <div className="profile-menu">
                      <button onClick={() => {
                        navigate('/profile');
                        setIsOpen(false);
                      }}>Profile</button>
                      <button onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {!isRestaurantLoggedIn && (
                    <Link to="/login" className="btn-outline-light" onClick={handleNavLinkClick}>Login</Link>
                  )}
                  {isRestaurantLoggedIn ? (
                    <button className="btn-outline-light restaurant-login" onClick={() => {
                      handleRestaurantLogout();
                      handleNavLinkClick();
                    }}>
                      Restaurant Logout
                    </button>
                  ) : (
                    <Link to="/restaurant-login" className="btn-outline-light restaurant-login" onClick={handleNavLinkClick}>
                      Restaurant Login
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Desktop-only profile section */}
          <div className="d-none d-lg-flex align-items-center">
            {isLoggedIn ? (
              <div className="profile-section">
                <div 
                  className="profile-trigger"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <AccountCircleIcon className="profile-icon" />
                  <span className="user-name">{userName}</span>
                </div>
                {showProfileMenu && (
                  <div className="profile-menu">
                    <button onClick={() => navigate('/profile')}>Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {!isRestaurantLoggedIn && (
                  <Link to="/login" className="btn-outline-light">Login</Link>
                )}
                {isRestaurantLoggedIn ? (
                  <button className="btn-outline-light restaurant-login" onClick={handleRestaurantLogout}>
                    Restaurant Logout
                  </button>
                ) : (
                  <Link to="/restaurant-login" className="btn-outline-light restaurant-login">
                    Restaurant Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;