// frontend/src/components/navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Auth from '../../utils/auth';
import '../../components/navbar/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = Auth.isAuthenticated();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      const user = Auth.getLoggedInUser();
      setUserName(user ? user.first_name : '');
      
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    Auth.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/tasks" className="navbar-logo">
          MyTasks
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/kanban" className="navbar-link">
                Kanban
              </Link>
              <Link to="/tasks" className="navbar-link">
                Görev Listesi
              </Link>
              <Link to="/notifications" className="navbar-link">
                Notifications
              </Link>
              <Link to="/projects/create" className="navbar-link">
                Create Project
              </Link>
              <Link to="/user/profile" className="navbar-link">
                Profile
              </Link>
              <Link to="/user/settings" className="navbar-link">
                Settings
              </Link>
              <button onClick={handleLogout} className="navbar-link logout-btn">
                Logout
              </button>
              <span className="navbar-link welcome-user">Hoşgeldin {userName}</span>

            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
              <Link to="/reset-password" className="navbar-link">
                Reset Password
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;