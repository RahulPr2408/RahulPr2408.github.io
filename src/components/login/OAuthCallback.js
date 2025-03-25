import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const isRestaurant = searchParams.get('isRestaurant');
    const id = searchParams.get('id');
    
    if (token && name) {
      if (isRestaurant === 'true') {
        localStorage.setItem('restaurantToken', token);
        localStorage.setItem('restaurantName', name);
        localStorage.setItem('restaurantId', id);
        navigate('/restaurant-dashboard');
      } else {
        login(token, name);
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [searchParams, login, navigate]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;
