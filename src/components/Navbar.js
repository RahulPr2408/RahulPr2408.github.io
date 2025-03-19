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

  const handleLogout = () => {
    logout();
    navigate('/');
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
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">Our Story</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">Our Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonial">Testimonial</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Replace the login buttons with this new section */}
          <div className="d-flex align-items-center">
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
                <Link to="/login" className="btn-outline-light">Login</Link>
                <Link to="/restaurant-login" className="btn-outline-light restaurant-login">
                  Restaurant Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;