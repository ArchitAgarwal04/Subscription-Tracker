import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signUp, signIn, getUser } from '../lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, validate token with backend
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Fetch user from backend if token exists but user data is missing
        getUser().then(response => {
          const user = response.data.data;
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        }).catch(() => {
          // Token is invalid, log out
          localStorage.removeItem('token');
        });
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await signIn({ email, password });
    const { token, user } = response.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const response = await signUp({ email, password, name });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      // Re-throw the actual error message from the backend
      const errorMessage = error.response?.data?.error || error.message || 'An unknown registration error occurred';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};