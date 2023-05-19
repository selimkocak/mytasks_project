// frontend\src\components\auth\ResetPassword.js
import React, { useState } from 'react';
import { resetPassword } from '../../services/api';
import './ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      setSuccessMessage('Şifre sıfırlama bağlantısı gönderildi.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Şifre sıfırlama bağlantısı gönderilemedi. Lütfen tekrar deneyin.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Şifre Sıfırlama</h2>
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <input
          type="email"
          placeholder="E-posta adresinizi girin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Şifre Sıfırlama Bağlantısı Gönder</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ResetPassword;
