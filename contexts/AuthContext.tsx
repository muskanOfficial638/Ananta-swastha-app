'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  name?: string;
  dosha?: string; // Add optional dosha property
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
  signup: (name: string, email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing auth token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();
      
      if (token) {
        // In a real application, you would validate the token with the backend
        // For now, we'll just set a demo user
        setUser({ email: 'user@example.com' });
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authService.login({ email, password });
        if (response.success && response.token) {
        authService.setToken(response.token);
        setUser({ email, name: response.data?.name });
        router.push('/dashboard');
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authService.signup({ name, email, password });
        if (response.success && response.token) {
        authService.setToken(response.token);
        setUser({ email, name });
        router.push('/dashboard');
        return { success: true, message: 'Account created successfully' };
      } else {
        return { success: false, message: response.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};