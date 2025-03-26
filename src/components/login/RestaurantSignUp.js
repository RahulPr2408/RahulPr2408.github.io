import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const RestaurantSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/restaurant/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        let errorData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          const errorText = await response.text();
          try {
            errorData = JSON.parse(errorText);
          } catch (parseError) {
            console.error('Failed to parse error JSON:', errorText);
            setMessage('Signup failed due to a server error.');
            return;
          }
        }
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/restaurant-login'), 2000);
    } catch (error) {
      setMessage(error.message || 'An error occurred. Please try again.');
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/google?restaurant=true&signup=true';
  };

  return (
    <main className="main-content">
      <div className="login-section">
        <h1 className="login-title">Restaurant Registration</h1>
        
        <div className="welcome-text">
          <p>Join Second Plate as a restaurant partner and help us reduce food waste while making a difference.</p>
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="name">Restaurant Name</label>
              <input 
                type="text"
                name="name"
                placeholder="Restaurant Name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Business Email</label>
              <input 
                type="email"
                name="email"
                placeholder="business@example.com"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                name="password"
                placeholder="********"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Restaurant Address</label>
              <input 
                type="text"
                name="address"
                placeholder="Full Address"
                className="form-input"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Contact Number</label>
              <input 
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="sign-in-btn">Register Restaurant</button>
            {message && <p className="message">{message}</p>}
            
            <div className="separator">
              <span>or</span>
            </div>

            <button 
              type="button" 
              className="google-sign-in"
              onClick={handleGoogleSignUp}
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google Icon" 
                className="google-icon" 
              />
              Sign up with Google
            </button>
            
            <div className="signup-option">
              <span>Already have an account? </span>
              <Link to="/restaurant-login" className="signup-link">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RestaurantSignUp;
