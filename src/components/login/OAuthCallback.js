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
    
    if (token && name) {
      login(token, name);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [searchParams, login, navigate]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;
