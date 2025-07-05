import { useState, createContext, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'user' | 'organization') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock authentication service
export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('trackback_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : email.includes('org') ? 'organization' : 'user',
      createdAt: new Date()
    };
    
    setUser(mockUser);
    localStorage.setItem('trackback_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: 'user' | 'organization') => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date()
    };
    
    setUser(mockUser);
    localStorage.setItem('trackback_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trackback_user');
  };

  return {
    user,
    login,
    register,
    logout,
    loading
  };
};

export { AuthContext };