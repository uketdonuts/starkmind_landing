import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  currentView: 'home' | 'login' | 'videos';
  setCurrentView: (view: 'home' | 'login' | 'videos') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Contraseña simple para la demo - en producción deberías usar algo más seguro
const DEMO_PASSWORD = 'demo123';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'videos'>('home');

  useEffect(() => {
    // Verificar si ya está autenticado al cargar
    const auth = localStorage.getItem('demo_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    // Verificar si la URL contiene el parámetro de demo
    const urlParams = new URLSearchParams(window.location.search);
    const demoParam = urlParams.get('demo');
    if (demoParam === 'access') {
      setCurrentView('login');
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('demo_authenticated', 'true');
      setCurrentView('videos');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('demo_authenticated');
    setCurrentView('home');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      currentView,
      setCurrentView
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};