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
  const [logoImage, setLogoImage] = useState(null);
  const [mapImage, setMapImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [mapPreview, setMapPreview] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMapImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMapPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      
      if (logoImage) {
        data.append('logoImage', logoImage);
      }
      
      if (mapImage) {
        data.append('mapImage', mapImage);
      }

      console.log('Sending restaurant signup data:', Object.fromEntries(data.entries()));

      const response = await fetch('http://localhost:3000/api/auth/restaurant/signup', {
        method: 'POST',
        credentials: 'include',
        body: data,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/restaurant-login'), 2000);
    } catch (error) {
      setMessage(error.message || 'Registration failed. Please try again.');
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
          <form className="login-form" onSubmit={handleSignUp} encType="multipart/form-data">
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

            <div className="form-group">
              <label htmlFor="logoImage">Restaurant Logo</label>
              <input 
                type="file"
                id="logoImage"
                name="logoImage"
                accept="image/*"
                className="form-input"
                onChange={handleLogoChange}
              />
              {logoPreview && (
                <div className="image-preview">
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mapImage">Restaurant Location Map</label>
              <input 
                type="file"
                id="mapImage"
                name="mapImage"
                accept="image/*"
                className="form-input"
                onChange={handleMapChange}
              />
              {mapPreview && (
                <div className="image-preview">
                  <img 
                    src={mapPreview} 
                    alt="Map preview" 
                    style={{ maxWidth: '100%', maxHeight: '150px', marginTop: '10px' }}
                  />
                </div>
              )}
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
