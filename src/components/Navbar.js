import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
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

  // Close menus when clicking outside
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

  // Close mobile menu on link click
  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark custom-navbar'>
        <div className='container-fluid'>
          {/* Logo */}
          <Link className='navbar-brand' to='/#home'>
            <img src={logo} alt="Second Plate Logo" className="navbar-logo" />
          </Link>

          {/* Hamburger Toggle */}
          <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/#home" onClick={handleNavLinkClick}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#about" onClick={handleNavLinkClick}>Our Story</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#team" onClick={handleNavLinkClick}>Our Team</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/team" onClick={handleNavLinkClick}>All Team</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#testimonial" onClick={handleNavLinkClick}>Testimonial</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#contact" onClick={handleNavLinkClick}>Contact Us</Link>
              </li>
            </ul>

            {/* Mobile-only section */}
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
                      {/* <button onClick={() => { navigate('/profile'); setIsOpen(false); }}>Profile</button> */}
                      <button onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Regular user Login (hidden if restaurant logged in) */}
                  {!isLoggedIn && !isRestaurantLoggedIn && (
                    <Link to="/login" className="btn-outline-light" onClick={handleNavLinkClick}>
                      Login
                    </Link>
                  )}

                  {/* Restaurant Logout if logged in */}
                  {isRestaurantLoggedIn && (
                    <button
                      className="btn-outline-light restaurant-login"
                      onClick={() => { handleRestaurantLogout(); handleNavLinkClick(); }}
                    >
                      Restaurant Logout
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Desktop-only section */}
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
                    {/* <button onClick={() => navigate('/profile')}>Profile</button> */}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Regular user Login (hidden if restaurant logged in) */}
                {!isLoggedIn && !isRestaurantLoggedIn && (
                  <Link to="/login" className="btn-outline-light">
                    Login
                  </Link>
                )}

                {/* Restaurant Logout if logged in */}
                {isRestaurantLoggedIn && (
                  <button className="btn-outline-light restaurant-login" onClick={handleRestaurantLogout}>
                    Restaurant Logout
                  </button>
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