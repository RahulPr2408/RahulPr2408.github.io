import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../assets/second-plate-logo-title.png"

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark custom-navbar'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#home'>
            <img src={logo} alt="Second Plate Logo" className="navbar-logo" />
          </a>

          {/* Middle part with navigation links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonial">Testimonial</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">Team</a>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          <div className="d-flex">
            <button className="btn btn-outline-light">Login</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;