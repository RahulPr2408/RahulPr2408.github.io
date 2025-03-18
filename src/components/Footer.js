import React from 'react';
import './Footer.css';
import logo from "../assets/second-plate-logo-title.png";
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row row-custom">
          
        
          <div className="col-md-3">
            <div className="footer-section">
              <img src={logo} alt="Second Plate Logo" className="footer-logo" />
              <p className="footer-text">To stay updated with our latest activities and impact stories, follow us here.</p>

              <div className="social-links">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
                <div class="instagram-icon">
                    <a href="https://www.instagram.com/enactusnortheastern?igsh=MWIzMGhhZjdieWZ4NA==" target="_blank">
                        <i class="fab fa-instagram instagram-icon"></i>
                    </a>
                </div>
                <div class="linkedin-icon">
                    <a href="https://www.linkedin.com/company/enactus-northeastern-toronto/" target="_blank">
                        <i class="fab fa-linkedin linkedin-icon"></i>
                    </a>
                </div>
              </div>
              <br></br>
              <section id='contact' className="footer-text">
                <p>enactusnortheasternto@outlook.com</p>
              </section>
            </div>
          </div>

          {/* Column 2: Pages Links */}
          <div className="col-md-3 middle-section-custom">
            <div className="footer-pages">
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Our Story</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Utility Pages */}
          <div className="col-md-3 middle-section-custom">
            <div className="footer-utility">
              <ul className="footer-links">
                <li><Link to="/partners">Partners</Link></li>
                <li><Link to="/awards">Awards</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="col-md-3 footer-images-section">
            <div className="footer-section">
              <p className="footer-text">Want to stay in the loop? Subscribe to our newsletter!</p>
              <form className="footer-form">
                <input type="email" placeholder="Enter your email" className="footer-input" />
                <button type="submit" className="btn-custom-secondary">Subscribe</button>
              </form>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="copyright-text">
              Copyright © 2024 Enactus Northeastern. All Rights Reserved |
              <Link to="/terms" className="footer-link"> Terms of Use</Link> |
              <Link to="/privacy-policy" className="footer-link"> Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;