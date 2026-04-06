import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem('atelier-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        window.sessionStorage.removeItem('atelier-user');
      }
    }
  }, []);

  const login = (authUser: AuthUser) => {
    setUser(authUser);
    window.sessionStorage.setItem('atelier-user', JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    window.sessionStorage.removeItem('atelier-user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
