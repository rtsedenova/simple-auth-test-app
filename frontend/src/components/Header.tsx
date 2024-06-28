import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">НАША КОМАНДА</h1>
        <h3 className="header-subtitle">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи,<br/> и умеющие находить выход из любых, даже самых сложных ситуаций. </h3>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Выход</button>
    </div>
  );
};

export default Header;
