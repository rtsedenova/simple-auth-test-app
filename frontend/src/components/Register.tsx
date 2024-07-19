import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUsers } from '../features/userSlice';
import ReusableInput from './Input';
import './Register.css';

const generateId = () => {
  return Math.random().toString(36).substr(2, 16);
};

const Register: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(users); 
  }, [users]); 

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      alert("Пользователь с такой почтой уже зарегистрирован");
      return;
    }

    const id = generateId();
    dispatch(addUser({ id, nickname, email, password }));
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/login'); 
    }, 3000);
  };

  return (
    <div className='register-form'>
      <h2>Регистрация</h2>
      <div className='register-inputs-container'>
        <ReusableInput
          label='Имя'
          inputType="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder='Введите имя'
        />
        <ReusableInput
          label='Электронная почта'
          inputType="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Введите почту'
        />
        <ReusableInput
          label='Пароль'
          inputType="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Введите пароль'
        />
        <ReusableInput
          label='Подтвердите пароль'
          inputType="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Повторите пароль'
        />
      </div>
        <button className='register-btn' onClick={handleRegister}>Зарегистрироваться</button>
      <Link to="/login" className='link'>Уже есть аккаунт</Link>
      {showSuccessMessage && (
        <div className='success-message'>
          Аккаунт успешно создан!
        </div>
      )}
    </div>
  );
};

export default Register;
