import React, { createContext, useState, useEffect } from 'react';
import { User } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isModalOpen: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/auth/login', { username, password });
      const userData = await response.json();
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      closeAuthModal();
      
      toast({
        title: 'Welcome back!',
        description: `You've successfully logged in as ${userData.name || userData.username}`,
      });
      
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Invalid username or password',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      const newUser = await response.json();
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      closeAuthModal();
      
      toast({
        title: 'Account created!',
        description: 'Your account has been successfully created',
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'Could not create account. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  const openAuthModal = () => setIsModalOpen(true);
  const closeAuthModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isModalOpen,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
