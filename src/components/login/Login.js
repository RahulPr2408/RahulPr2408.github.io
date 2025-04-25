import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import './Login.css';
import { useAuth } from '../../context/AuthContext';
import { signIn } from '../../services/dashboardService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      login(user);
      
      toast.success('Login successful! Welcome back!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
      
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <main className="main-content">
        <div className="login-section">
          <h1 className="login-title">Login</h1>
          
          <div className="welcome-text">
            <p>Welcome to Second Plate – where every plate tells a story of kindness and connection.</p>
            <p>Thank you for joining us on this journey to nourish not just bodies, but hearts and minds as well.</p>
            <p>Together, we can make a difference, one plate at a time.</p>
          </div>

          <div className="login-form-container">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  required
                />
              </div>
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                {/* <a href="#" className="forgot-link">Forgot password</a> */}
              </div>
              <button type="submit" className="sign-in-btn">Sign In</button>
              {message && <p className="message">{message}</p>}
              {/* <button 
                type="button" 
                className="google-sign-in"
                onClick={handleGoogleLogin}
              >
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google Icon" 
                  className="google-icon" 
                />
                Sign in with Google
              </button> */}
              <div className="signup-option">
                <span>Don't have an account? </span>
                <Link to="/signup" className="signup-link">Sign up for free!</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-item">
            <h3>Call Us:</h3>
            <p className="phone">+1-437-428-2577</p>
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