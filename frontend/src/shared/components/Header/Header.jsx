import { Box, IconButton } from '@mui/material';
import { Home, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProtectedRoute } from '../ProtectedRoute/useProtectedRoute/';

function Header() {
  const navigate = useNavigate();
  const { logout } = useProtectedRoute();

  return (
    <Box sx={{ 
      height: '50px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      px: 2,
      mb: 3, 
      borderBottom: '1px solid #e0e0e0'
    }}>
        
        <IconButton onClick={() => navigate('/')}>
            <Home />
        </IconButton>
        <img 
        src="/images/stock_sync_symbol.svg" 
        alt="Home" 
        style={{ height: '50px' }}
        onClick={() => navigate('/')}
        />
        <IconButton onClick={() => { logout(); navigate('/login'); }}>
            <Logout />
        </IconButton>
    </Box>
  );
}

export { Header };