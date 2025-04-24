import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, type = 'user' }) => {
  const { isLoggedIn, userType } = useAuth();

  if (type === 'restaurant') {
    if (!isLoggedIn || userType !== 'restaurant') {
      return <Navigate to="/restaurant-login" />;
    }
  } else {
    if (!isLoggedIn || userType !== type) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectedRoute;
