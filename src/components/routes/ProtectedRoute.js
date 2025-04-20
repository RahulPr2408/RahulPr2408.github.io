import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, type = 'user' }) => {
  const { isLoggedIn, userType } = useAuth();

  if (!isLoggedIn || (type !== userType)) {
    return <Navigate to={type === 'restaurant' ? '/restaurant-login' : '/login'} />;
  }

  return children;
};

export default ProtectedRoute;
