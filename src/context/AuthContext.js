import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('user');

  useEffect(() => {
    // Check for existing tokens on mount
    const userToken = localStorage.getItem('userToken');
    const restaurantToken = localStorage.getItem('restaurantToken');
    const storedName = localStorage.getItem('userName') || localStorage.getItem('restaurantName');
    
    if (restaurantToken) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('restaurantName') || '');
      setUserType('restaurant');
    } else if (userToken) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('userName') || '');
      setUserType('user');
    }
  }, []);

  const login = useCallback((token, name, type = 'user') => {
    if (type === 'restaurant') {
      localStorage.setItem('restaurantToken', token);
      localStorage.setItem('restaurantName', name);
    } else {
      localStorage.setItem('userToken', token);
      localStorage.setItem('userName', name);
    }
    setIsLoggedIn(true);
    setUserName(name);
    setUserType(type);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('restaurantToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('restaurantName');
    localStorage.removeItem('restaurantId');
    setIsLoggedIn(false);
    setUserName('');
    setUserType('user');
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

      const data = await response.json();
      if (data.valid) {
        setUserType(data.user.type || 'user');
        return true;
      }

      logout();
      return false;
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
      return false;
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userName, 
      userType,
      login,
      logout,
      checkAuthStatus 
    }}>
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
