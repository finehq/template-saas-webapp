import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

// Define the User type
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Define the AuthContext interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Storage keys
const USER_STORAGE_KEY = "fine-auth-user";
const AUTH_TOKEN_KEY = "fine-auth-token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing user session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        const token = localStorage.getItem(AUTH_TOKEN_KEY);

        if (storedUser && token) {
          // In a real app, you would validate the token with your backend here
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        // Clear potentially corrupted auth data
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your auth API here
      // const response = await api.post('/auth/login', { email, password });
      
      // For demo purposes, we'll accept any email/password with basic validation
      if (!email.includes('@') || password.length < 6) {
        toast.error("Invalid credentials");
        return false;
      }
      
      // Create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name: email.split('@')[0]
      };
      
      // Store user data and token
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      localStorage.setItem(AUTH_TOKEN_KEY, `mock-token-${Date.now()}`);
      
      setUser(mockUser);
      toast.success("Login successful");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would call your auth API here
      // await api.post('/auth/logout');
      
      // Clear stored data
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your auth API here
      // const response = await api.post('/auth/signup', { email, password, name });
      
      // For demo purposes, we'll accept any email/password with basic validation
      if (!email.includes('@') || password.length < 6) {
        toast.error("Invalid credentials");
        return false;
      }
      
      // Create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name: name || email.split('@')[0]
      };
      
      // Store user data and token
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      localStorage.setItem(AUTH_TOKEN_KEY, `mock-token-${Date.now()}`);
      
      setUser(mockUser);
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Create the auth context value
  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
