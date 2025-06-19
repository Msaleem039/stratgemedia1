import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check localStorage for user
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setError(null);
    const storedCreds = JSON.parse(localStorage.getItem('creds'));
    if (storedCreds && storedCreds.email === email && storedCreds.password === password) {
      const userData = { email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('auth', 'true');
      setError(null);
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  const signup = (name, email, password) => {
    setError(null);
    const creds = { name, email, password };
    localStorage.setItem('creds', JSON.stringify(creds));
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('auth', 'true');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAuthenticated: !!user, error }}>
      {children}
    </AuthContext.Provider>
  );
}; 