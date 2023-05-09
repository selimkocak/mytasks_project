// frontend/src/components/auth/SignIn.js
import React, { useState } from 'react';
import api from '../../services/api'; // api'yi import ettik

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => { // fonksiyonu async olarak tanımladık
    e.preventDefault();
    
    try {
      // Burada kullanıcının giriş işlemi gerçekleştirilir
      const response = await api.login({email, password}); // login fonksiyonunu çağırıyoruz
      console.log(response.data); // başarılı giriş durumunda dönen veriyi log'luyoruz

      // Burada başarılı giriş durumunda yapılacak işlemler (ör. token'ın localStorage'a kaydedilmesi) gerçekleştirilebilir
    } catch (error) {
      console.error(error); // hatalı giriş durumunda hatayı log'luyoruz
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
