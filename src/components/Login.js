import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <>
      {/* Top Section with Background Image */}
      <main className="main-content">
        <div className="login-section">
          <h1 className="login-title">Login</h1>
          
          <div className="welcome-text">
            <p>Welcome to Second Plate – where every plate tells a story of kindness and connection.</p>
            <p>Thank you for joining us on this journey to nourish not just bodies, but hearts and minds as well.</p>
            <p>Together, we can make a difference, one plate at a time.</p>
          </div>

          <div className="login-form-container">
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="********" 
                  className="form-input"
                />
              </div>
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-link">Forgot password</a>
              </div>
              <button type="submit" className="sign-in-btn">Sign In</button>
              <button type="button" className="google-sign-in">
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google Icon" 
                  className="google-icon" 
                />
                Sign in with Google
              </button>
              <div className="signup-option">
                <span>Don't have an account? </span>
                <a href="#" className="signup-link">Sign up for free!</a>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Bottom Section with Solid Background */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-item">
            <h3>Call Us:</h3>
            <p className="phone">+1-416-500-8900</p>
          </div>
          <div className="contact-item">
            <h3>Hours:</h3>
            <p>Mon-Fri: 9am - 6pm</p>
            <p>Sat, Sun: 9am - 3pm</p>
          </div>
          <div className="contact-item">
            <h3>Our Location:</h3>
            <p>100 King St. W.</p>
            <p>Toronto, ON M5V 3H9</p>
            <p>Canada</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;