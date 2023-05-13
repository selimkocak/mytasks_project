// frontend\src\App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignIn from './components/auth/SignIn';
import Logout from './components/auth/Logout';
import SignUp from './components/auth/SignUp';
import PrivateRoutes from './utils/PrivateRoutes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};
export default App;