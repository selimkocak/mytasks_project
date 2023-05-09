// frontend\src\components\navbar\Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          MyTasks
        </Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
