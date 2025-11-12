import { useState } from 'react';
import { LoginRegisterForm } from '@shared/components/LoginRegisterForm';
import { Box, Typography, Link  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Login() {

  return(
    <>
     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img 
          src="/images/stock_sync.svg" 
          alt="Login Illustration" 
          style={{ width: 200, height: 200 }}
        />
      </Box>
      <LoginRegisterForm route="/token/" method="login" />
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2">
          Você não tem conta?{' '}
          <Link 
            component={RouterLink} 
            to="/register" 
            underline="hover"
            sx={{ fontWeight: 'bold' }}
          >
            Crie agora!
          </Link>
        </Typography>
      </Box>
    </>
  )
  
}

export { Login };