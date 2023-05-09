// frontend/src/components/auth/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate'ı import ettik
import api from '../../services/api'; 

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook'unu çağırarak bir navigate fonksiyonu oluşturduk

  const handleSignIn = async (e) => { 
    e.preventDefault();
    
    try {
      const response = await api.login({email, password});
      console.log(response.data);

      // Kullanıcının girişi başarılı olursa TasksList sayfasına yönlendir
      navigate('/tasks');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;