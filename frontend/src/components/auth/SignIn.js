// frontend/src/components/auth/SignIn.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { login } from '../../services/api';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      setUser(response.data.user);
      localStorage.setItem('token', JSON.stringify(response.data.access));

      navigate('/kanban');
    } catch (error) {
      setError("Giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Giriş Yap</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignIn} className="signin-form">
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default SignIn;
