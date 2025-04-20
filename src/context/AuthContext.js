import React, { createContext, useState, useContext } from 'react';

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

  const login = (token, name, type = 'user') => {
    const tokenKey = type === 'restaurant' ? 'restaurantToken' : 'userToken';
    localStorage.setItem(tokenKey, token);
    localStorage.setItem('userName', name);
    setIsLoggedIn(true);
    setUserName(name);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('restaurantToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    setUserType('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
