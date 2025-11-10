import { useState } from 'react';
import { LoginRegisterForm } from '@shared/components/LoginRegisterForm';
import { Typography } from '@mui/material';

function Login() {

  return(
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Login Page
      </Typography>
      <LoginRegisterForm route="/token/" method="login" />
    </>
  )
  
}

export { Login };