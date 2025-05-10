import { createContext, useState, useContext } from 'react';
import { UserSignUp, UserSignIn } from '../api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await UserSignIn({ email, password });
      console.log('Login response:', response);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data || 'Failed to login');
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check if the backend is running.');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error('Failed to login: ' + error.message);
      }
    }
  };

  const signup = async (name, email, password) => {
    try {
      const requestData = { name, email, password };
      console.log('Signup request data:', requestData);
      console.log('Request URL:', 'http://localhost:8080/api/user/signup');
      
      const response = await UserSignUp(requestData);
      console.log('Signup response:', response);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data || 'Failed to create account');
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check if the backend is running.');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error('Failed to create account: ' + error.message);
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, setUser }}>
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