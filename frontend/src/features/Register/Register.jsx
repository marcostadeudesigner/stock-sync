import { LoginRegisterForm } from "@shared/components/LoginRegisterForm"
import { Box } from "@mui/material"
function Register() {
  return(
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img 
          src="/images/stock_sync.svg" 
          alt="Login Illustration" 
          style={{ width: 200, height: 200 }}
        />
      </Box>
      <LoginRegisterForm route="/register/" method="register"/>
    </>
  )
}

export  { Register }