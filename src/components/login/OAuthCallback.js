import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle } from '../../services/dashboardService';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userType } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      const doGoogleLogin = async () => {
        try {
          await signInWithGoogle();
        } catch (error) {
          console.error('Google login failed:', error);
          navigate('/login');
        }
      };
      doGoogleLogin();
    } else if (userType === 'restaurant') {
      navigate('/restaurant-dashboard');
    } else {
      navigate('/');
    }
  }, [navigate, isLoggedIn, userType]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;
