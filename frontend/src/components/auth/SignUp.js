// frontend/src/components/auth/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register({ email, first_name: firstName, last_name: lastName, password });
      navigate('/login');
    } catch (error) {
      setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Kayıt Ol</h2>
      {error && <p>{error}</p>}
      <form className="signup-form" onSubmit={handleSignUp}>
        <div>
          <label>E-posta:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username" // Otomatik tamamlama özniteliği eklendi
          />
        </div>
        <div>
          <label>Ad:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Soyad:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password" // Otomatik tamamlama özniteliği eklendi
          />
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
      <p>
        Zaten bir hesabınız var mı? <Link to="/login">Giriş yapın</Link>.
      </p>
    </div>
  );
};

export default SignUp;
