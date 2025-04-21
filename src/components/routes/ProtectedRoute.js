import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, type = 'user' }) => {
  const { isLoggedIn, userType } = useAuth();
  const restaurantToken = localStorage.getItem('restaurantToken');

  // For restaurant routes, check both the auth context and local storage
  if (type === 'restaurant') {
    if (!isLoggedIn || !restaurantToken || userType !== 'restaurant') {
      return <Navigate to="/restaurant-login" />;
    }
  } else {
    // For regular user routes
    if (!isLoggedIn || userType !== type) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectedRoute;
