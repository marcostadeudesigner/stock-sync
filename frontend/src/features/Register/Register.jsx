import { LoginRegisterForm } from "@shared/components/LoginRegisterForm"
function Register() {
  return<LoginRegisterForm route="/api/user/register" method="register"/>
}

export  { Register }