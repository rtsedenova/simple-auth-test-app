import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../features/authSlice';
import { selectUsers } from '../features/userSlice';
import { SignJWT } from 'jose';
import ReusableInput from './Input';
import './Login.css'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);

  const handleLogin = async () => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      const secret = new TextEncoder().encode('secret-key');
      const token = await new SignJWT({ userId: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

      dispatch(login(token));
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='login-form'>  
      <h2>Авторизация</h2>
      <div className='login-inputs-container'>  
        <ReusableInput
          label="Email"
          inputType="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Введите почту'
        />
        <ReusableInput
          label="Password"
          inputType="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Введите пароль'
        />
      </div>
      <button className='login-btn' onClick={handleLogin}>Войти</button> 
      <Link to="/register" className='link'>Еще не зарегистрированы?</Link> 
    </div>
  );
};

export default Login;
