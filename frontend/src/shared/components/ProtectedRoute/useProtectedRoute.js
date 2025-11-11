import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api } from '@shared/api';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants/authConstants';

export function useProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refresh) {
      setIsAuthorized(false);
      return false;
    }

    try {
      const response = await api.post('/token/refresh/', {
        refresh: refresh,
      });
      
      if (response.data.access) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
        setIsAuthorized(true);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);

      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    
    setIsAuthorized(false);
    return false;
  };

  const validateToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const tokenExpiration = decodedToken.exp;
      const currentTime = Date.now() / 1000;

      return tokenExpiration > currentTime;
    } catch (error) {
      console.error('Token decode failed:', error);
      return false;
    }
  };

  const authenticate = async () => {
    setLoading(true);
    
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    
    if (!token) {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    try {
      const isValid = validateToken(token);
      
      if (isValid) {
        setIsAuthorized(true);
      } else {
        await refreshToken();
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setIsAuthorized(false);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return {
    isAuthorized,
    loading,
    authenticate,
    logout,
    refreshToken,
  };
}