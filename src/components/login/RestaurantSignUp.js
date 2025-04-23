import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import './Login.css';

const RestaurantSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    try {
      const data = new FormData();
      
      // Append regular form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword') {
          data.append(key, formData[key]);
        }
      });

      // Append files if they exist
      if (logoImage) {
        console.log('Appending logo image:', logoImage.name);
        data.append('logoImage', logoImage);
      }

      if (mapImage) {
        console.log('Appending map image:', mapImage.name);
        data.append('mapImage', mapImage);
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/restaurant/signup`, {
        method: 'POST',
        body: data,
        // Remove Content-Type header to let the browser set it with boundary
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);
      
      if (!response.ok) {
        console.error('Server error response:', responseData);
        throw new Error(responseData.message || `Error: ${response.status}`);
      }

      toast.success('Registration successful! Redirecting to login...', {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      
      setTimeout(() => navigate('/restaurant-login'), 2000);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Registration failed. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password"
                name="confirmPassword"
                placeholder="********"
                className="form-input"
                value={formData.confirmPassword}
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
