import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from '../features/authSlice';

const ProtectedRoute: React.FC = () => {
  const token = useSelector(selectToken);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
