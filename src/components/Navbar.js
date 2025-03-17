import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../assets/second-plate-logo-title.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Login Button (Same Design) */}
          <div className="d-flex">
            <button className="btn-outline-light">Login</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;