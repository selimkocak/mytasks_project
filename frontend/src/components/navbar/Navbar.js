// frontend\src\components\navbar\Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { isAuthenticated }  from '../../utils/auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          MyTasks
        </Link>
        {isLoggedIn ? (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/projects" className="nav-links">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications" className="nav-links">
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-links">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-links">
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-links">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
