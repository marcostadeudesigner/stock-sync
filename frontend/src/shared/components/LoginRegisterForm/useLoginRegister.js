import { useState } from 'react';
import { api } from "@shared/api";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants/authConstants';

export function useLoginRegister(route, method) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = formData.username.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setLoading(true);

    // Normalize route to ensure it starts and ends with a slash
    const endpointBase = route?.startsWith('/') ? route : `/${route || ''}`;
    const endpoint = endpointBase.endsWith('/') ? endpointBase : `${endpointBase}/`;

    try {
      const response = await api.post(endpoint, { ...formData });


      // Only proceed when we have tokens
      if (response.status >= 200 && response.status < 300 && response.data?.access) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
        if (response.data.refresh) {
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
        }
        navigate('/');
        return;
      }

       // Only proceed when is a new user registration
      if(response.status == 201) {
         navigate('/login');
      }

      // If no tokens, show a helpful error
      console.error('Login did not return access token', response.data);
    } catch (error) {
      
      // Log detailed error for debugging
      if (error.response) {
        console.error('Login error response:', error.response.status, error.response.data);
      } else {
        console.error('Login request failed:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
    });
    setShowPassword(false);
  };

  return {
    formData,
    showPassword,
    loading,
    isFormValid,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    resetForm,
    formName: method === 'login' ? 'Login' : 'Novo Usuário',
  };
}