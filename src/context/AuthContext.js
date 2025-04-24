import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing tokens on mount
    const restaurantToken = localStorage.getItem('restaurantToken');
    if (restaurantToken) {
      setIsLoggedIn(true);
      setUserType('restaurant');
      // Don't set loading to false yet, wait for Firebase auth check
    }

    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setUserName(user.displayName || '');
        // Only set userType if not already set as restaurant
        if (!localStorage.getItem('restaurantToken')) {
          setUserType('user');
        }
      } else {
        // Only clear auth state if there's no restaurant token
        if (!localStorage.getItem('restaurantToken')) {
          setCurrentUser(null);
          setIsLoggedIn(false);
          setUserName('');
          setUserType(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (user, name, type = 'user') => {
    setIsLoggedIn(true);
    setUserName(name || user?.displayName || '');
    setCurrentUser(user);
    setUserType(type);
  };

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('restaurantToken');
      setIsLoggedIn(false);
      setUserName('');
      setCurrentUser(null);
      setUserType(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    isLoggedIn,
    userName,
    currentUser,
    userType,
    loading,
    login,
    logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
