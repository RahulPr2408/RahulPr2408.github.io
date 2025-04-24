import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import { signUp } from '../../services/dashboardService';
import './Login.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', {
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
      return;
    }

    try {
      await signUp(email, password, name);
      
      toast.success('Account created successfully! Redirecting to login...', {
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
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.message || 'Signup failed. Please try again.', {
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
      console.error('Signup error:', error);
    }
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
                  required
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
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  placeholder="********" 
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="sign-in-btn">Create Account</button>
              {message && <p className="message">{message}</p>}
              {/* <button 
                type="button" 
                className="google-sign-in"
                onClick={handleGoogleSignUp}
              >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Icon" className="google-icon" />
                Sign up with Google
              </button> */}
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
