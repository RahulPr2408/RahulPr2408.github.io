import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.message || 'Signup failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <>
      <main className="main-content">
        <div className="login-section">
          <h1 className="login-title">Sign Up</h1>
          
          <div className="welcome-text">
            <p>Welcome to Second Plate – where every plate tells a story of kindness and connection.</p>
            <p>Thank you for joining us on this journey to nourish not just bodies, but hearts and minds as well.</p>
            <p>Together, we can make a difference, one plate at a time.</p>
          </div>

          <div className="login-form-container">
            <form className="login-form" onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="full-name">Full Name</label>
                <input 
                  type="text" 
                  id="full-name" 
                  placeholder="Full Name" 
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="********" 
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-link">Forgot password</a>
              </div>
              <button type="submit" className="sign-in-btn">Create Account</button>
              {message && <p className="message">{message}</p>}
              <button 
                type="button" 
                className="google-sign-in"
                onClick={handleGoogleSignUp}
              >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Icon" className="google-icon" />
                Sign up with Google
              </button>
              <div className="signup-option">
                <span>Already have an account? </span>
                <Link to="/login" className="signup-link">Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

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

export default SignUp;
