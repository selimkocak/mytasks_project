// frontend/src/components/auth/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { logout } from '../../services/api'; // logout'u import et
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await api.register({ email, password });
      console.log(response.data);

      navigate('/tasks');
    } catch (error) {
      console.error(error);
      setError('Kayıt olurken bir hata oluştu. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form className="signup-form" onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleLogout}>Logout</button> {/* Logout düğmesi */}
    </div>
  );
}

export default SignUp;
