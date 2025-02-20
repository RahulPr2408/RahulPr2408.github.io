import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../assets/Logo.png"

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark custom-navbar'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <img src={logo} alt="Second Plate Logo" className="navbar-logo" />
          </Link>

          {/* Middle part with navigation links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/testimonial">Testimonial</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
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