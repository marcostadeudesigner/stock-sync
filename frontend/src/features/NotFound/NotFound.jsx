import { CenterFocusStrong } from '@mui/icons-material';
import { Box } from '@mui/material';
function NotFound() {
  return (
   <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', mb: 3 }}>
        <img 
          src="/images/404.svg" 
          alt="Login Illustration" 
          style={{ width: '80%' }}
        />
      </Box> 
  )
}

export  { NotFound }