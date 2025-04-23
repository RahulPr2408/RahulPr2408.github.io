import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size before setting
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error('Logo image must be less than 2MB', {
          position: "top-center",
          theme: "dark",
        });
        e.target.value = null; // Reset file input
        return;
      }
      
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
      // Validate file size before setting
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error('Map image must be less than 2MB', {
          position: "top-center",
          theme: "dark",
        });
        e.target.value = null; // Reset file input
        return;
      }
      
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
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
     
      // Append regular fields
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add images if they exist
      if (logoImage) {
        formDataToSend.append('logoImage', logoImage);
      }

      if (mapImage) {
        formDataToSend.append('mapImage', mapImage);
      }

      // Set timeout for fetch to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/restaurant/signup`, {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      const responseData = await response.json();
      console.log('Server response:', responseData);
     
      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      toast.success('Registration successful! Redirecting to login...', {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
     
      setTimeout(() => navigate('/restaurant-login'), 2000);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'AbortError') {
        toast.error('Request timed out. Please check your network connection and try again.', {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.error(error.message || 'Registration failed. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } finally {
      setIsLoading(false);
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
              <label htmlFor="logoImage">Restaurant Logo (Max 2MB)</label>
              <input
                type="file"
                id="logoImage"
                name="logoImage"
                accept="image/jpeg,image/png,image/gif"
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
              <label htmlFor="mapImage">Restaurant Location Map (Max 2MB)</label>
              <input
                type="file"
                id="mapImage"
                name="mapImage"
                accept="image/jpeg,image/png,image/gif"
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

            <button 
              type="submit" 
              className="sign-in-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Restaurant'}
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