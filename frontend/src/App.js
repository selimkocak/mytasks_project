// frontend\src\App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignIn from './components/auth/SignIn';
import Logout from './components/auth/Logout';
import SignUp from './components/auth/SignUp';
import ResetPassword from './components/auth/ResetPassword';
import PrivateRoutes from './utils/PrivateRoutes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
