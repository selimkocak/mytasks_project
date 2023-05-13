// frontend\src\components\navbar\Navbar.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { isAuthenticated, logout } from "../../services/api";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

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
              <button onClick={handleLogout} className="nav-links">
                Logout
              </button>
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