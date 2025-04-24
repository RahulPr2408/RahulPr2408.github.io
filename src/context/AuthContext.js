import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setUserName(user.displayName || '');
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUserName(user.displayName || '');
    setCurrentUser(user);
  };

  const logout = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      setUserName('');
      setCurrentUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userName,
      currentUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
