// frontend/src/components/auth/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate'ı import ettik
import api from '../../services/api'; 

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook'unu çağırarak bir navigate fonksiyonu oluşturduk
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await api.register({email, password});
      console.log(response.data);

      // Kullanıcının kayıt işlemi başarılı olursa TasksList sayfasına yönlendir
      navigate('/tasks');
    } catch (error) {
      console.error(error);
      setError('Kayıt olurken bir hata oluştu. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>} {/* Eğer bir hata varsa, hatayı render eder */}
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
