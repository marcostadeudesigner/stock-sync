// LoginRegisterForm.jsx
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
import { useLoginRegister } from './useLoginRegister';

function LoginRegisterForm({ route, method }) {
  const {
    formData,
    showPassword,
    loading,
    isFormValid,
    formName,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLoginRegister(route, method);

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
        <Paper elevation={0} sx={{ padding: 4, width: '80%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            {formName}
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
                      onClick={togglePasswordVisibility}
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
              {loading ? 'Loading...' : formName}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export { LoginRegisterForm };