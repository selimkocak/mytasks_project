// frontend/src/components/auth/SignIn.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import api, { setAuthToken } from '../../services/api';

import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await api.login({ email, password });

      setUser(response.data.user);
      localStorage.setItem('token', JSON.stringify(response.data.access));
      setAuthToken(response.data.access);

      navigate('/kanban');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="signin-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
