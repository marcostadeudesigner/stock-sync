import { useState } from 'react';
import { api } from "@shared/api";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shared/constants/authConstants';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginRegisterForm({ route, method }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameForm = method === 'login' ? 'Login' : 'Novo Usuário';
  const navigate = useNavigate();
  
  const isFormValid = formData.username.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // fixed: use `name` instead of undefined `username`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // normalize route to ensure it starts and ends with a slash
    const endpointBase = route?.startsWith('/') ? route : `/${route || ''}`;
    const endpoint = endpointBase.endsWith('/') ? endpointBase : `${endpointBase}/`;

    try {
      const response = await api.post(endpoint, { ...formData });

      // debug logging
      console.log('Login response status:', response.status);
      console.log('Login response data:', response.data);

      // only proceed when we have tokens
      if (response.status >= 200 && response.status < 300 && response.data?.access) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
        if (response.data.refresh) {
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
        }
        navigate('/');
        return;
      }

      // if no tokens, show a helpful error
      console.error('Login did not return access token', response.data);
    } catch (error) {
      // log detailed error for debugging
      if (error.response) {
        console.error('Login error response:', error.response.status, error.response.data);
      } else {
        console.error('Login request failed:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            {nameForm}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome"
              name="username"
              autoComplete="name"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid || loading}
            >
              {loading ? 'Loading...' : nameForm}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export { LoginRegisterForm };