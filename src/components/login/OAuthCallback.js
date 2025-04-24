import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../services/dashboardService';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userType } = useAuth();

  useEffect(() => {
    const doGoogleLogin = async () => {
      try {
        await signInWithGoogle();
        // After Google sign-in, userType will be set by AuthContext
        if (userType === 'restaurant') {
          navigate('/restaurant-dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        navigate('/login');
      }
    };
    doGoogleLogin();
  }, [navigate, userType]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;
