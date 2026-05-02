import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role: 'student' | 'mentor' | 'admin') => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, role: 'student' | 'mentor' | 'admin') => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=FFD966&color=000`,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'student',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=FFD966&color=000`,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
