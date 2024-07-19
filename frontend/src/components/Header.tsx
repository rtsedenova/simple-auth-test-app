import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  page: 'home' | 'employee';
  employee?: {
    imageUrl: string;
    firstName: string;
    lastName: string;
    position: string;
  };
}

const Header: React.FC<HeaderProps> = ({ page, employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={`header ${page === 'employee' ? 'header-with-back' : ''}`}>
      {page === 'employee' && (
        <button className="back-btn" onClick={() => navigate('/')}>
          Назад
        </button>
      )}

      <div className="header-content">
        {page === 'employee' ? (
          <>
            <img src={employee?.imageUrl} alt={`${employee?.firstName} ${employee?.lastName}`} />
            <div>
              <h1>{employee?.firstName} {employee?.lastName}</h1>
              <h3>{employee?.position}</h3>
            </div>
          </>
        ) : (
          <>
            <h1 className="header-title">НАША КОМАНДА</h1>
            <h3 className="header-subtitle">
              Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи,
              <br /> и умеющие находить выход из любых, даже самых сложных ситуаций.
            </h3>
          </>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Выход
      </button>
    </div>
  );
};

export default Header;
