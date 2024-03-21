// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, initialLoggedInState, loginFunction, logoutFunction }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);

  const login = () => {
    if (loginFunction) {
      loginFunction(); // Call the provided login function
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (logoutFunction) {
      logoutFunction(); // Call the provided logout function
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};