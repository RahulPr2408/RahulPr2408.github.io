import React from 'react';
import './Footer.css';
import logo from "../assets/Logo.png"
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import footerImage1 from "../assets/footer_image_1.jpg"
import footerImage2 from "../assets/footer_image_2.jpg"
import footerImage3 from "../assets/footer_image_3.jpg"
import footerImage4 from "../assets/footer_image_4.jpg"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row row-custom">
          {/* First Section: Logo, Text, and Social Media Links */}
          <div className="col-md-4">
            <div className="footer-section">
              <img src={logo} alt="Logo" className="footer-logo" />
              {/* <h3 className="footer-title">Fifth Phantom Blade</h3>
              <p className="footer-text">Put some text here. Pick up from their slides.</p> */}
              <div className="social-links">
                <Link href="" target="_blank" className="social-icon-layout">
                  <InstagramIcon className="social-icon"/>
                </Link>
                <Link href="" target="_blank" className="social-icon-layout">
                  <LinkedInIcon className="social-icon" />
                </Link>
              </div>
            </div>
          </div>

          {/* Second Section: Pages and Utility Pages (Stacked Vertically) */}
          <div className="col-md-4 middle-section-custom">
            <div className="footer-section">
              <h4 className="footer-heading">Pages</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Utility Pages</h4>
              <ul className="footer-links">
                <li><Link href="/our-story">Our Story</Link></li>
                <li><Link href="/people">People</Link></li>
                <li><Link href="/partners">Partners</Link></li>
                <li><Link href="/awards">Awards and Recognition</Link></li>
              </ul>
            </div>
          </div>

          {/* Third Section: Text and Images */}
          <div className="col-md-4 footer-images-section">
            <div className="footer-section">
              <p className="footer-text">Follow Us On Instagram</p>
              <div className="footer-images">
                <img src={footerImage1} alt="Image 1" className="footer-image" />
                <img src={footerImage2} alt="Image 2" className="footer-image" />
                <img src={footerImage3} alt="Image 3" className="footer-image" />
                <img src={footerImage4} alt="Image 4" className="footer-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="copyright-text">Copyright © 2024 Enactus Northeastern. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;