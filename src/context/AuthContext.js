import React, { createContext, useState, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!(localStorage.getItem('userToken') || localStorage.getItem('restaurantToken'));
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('restaurantToken') ? 'restaurant' : 'user';
  });

  const login = useCallback((token, name, type = 'user') => {
    try {
      const tokenKey = type === 'restaurant' ? 'restaurantToken' : 'userToken';
      localStorage.setItem(tokenKey, token);
      localStorage.setItem('userName', name);
      setIsLoggedIn(true);
      setUserName(name);
      setUserType(type);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error saving login information. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('restaurantToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('restaurantId');
      setIsLoggedIn(false);
      setUserName('');
      setUserType('user');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('userToken') || localStorage.getItem('restaurantToken');
      if (!token) {
        logout();
        return false;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
      return false;
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, userType, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
