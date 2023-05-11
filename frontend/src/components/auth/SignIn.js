// frontend/src/components/auth/SignIn.js
import React, { useState, useContext } from 'react'; // useContext'u import ettik
import { useNavigate } from 'react-router-dom'; 
import api from '../../services/api'; 
import UserContext from '../../context/UserContext'; // UserContext'i import ettik

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const { setUser } = useContext(UserContext); // setUser fonksiyonunu aldık

  const handleSignIn = async (e) => { 
    e.preventDefault();
    
    try {
      const response = await api.login({email, password});
      console.log(response.data);

      setUser(response.data); // user durumunu güncelledik

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