import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { Login } from './features/Login';
import { Register } from './features/Register';
import { Dashboard } from './features/Dashboard';
import { Products } from './features/Products';
import { NotFound } from './features/NotFound';
import { ProtectedRoute as Auth } from '@shared/components/ProtectedRoute';


function Logout(){
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Navigate to="/Register" />;
}



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <Auth>
            <Dashboard />
          </Auth>
        } />
        <Route path="/product" element={
          <Auth>
            <Products />
          </Auth>
        } />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register-and-logout" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );

}

export default App
