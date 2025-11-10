import { useState } from 'react';
import { LoginFrom } from './LoginFrom';
import { Typography } from '@mui/material';

function Login() {

  return(
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Login Page
      </Typography>
      <LoginFrom />
    </>
  )
  
}

export { Login };