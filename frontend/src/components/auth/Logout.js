// frontend\src\components\auth\Logout.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../services/api';

const Logout = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => {
      setUser(null);
      navigate('/login');
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  }, [setUser, navigate]);

  // You can show a spinner or a "logging out..." message here
  return <div>Logging out...</div>;
};

export default Logout;
