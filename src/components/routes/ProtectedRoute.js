import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, type = 'user' }) => {
  const token = type === 'restaurant' 
    ? localStorage.getItem('restaurantToken')
    : localStorage.getItem('userToken');

  if (!token) {
    return <Navigate to={type === 'restaurant' ? '/restaurant-login' : '/login'} />;
  }

  return children;
};

export default ProtectedRoute;
