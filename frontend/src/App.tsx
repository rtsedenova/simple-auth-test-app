import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateLastActive, selectLastActive, selectToken } from './features/authSlice';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CardDetails from './pages/Card';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const lastActive = useSelector(selectLastActive);

  useEffect(() => {
    const handleActivity = () => {
      dispatch(updateLastActive());
    };

    const events = ['keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    const interval = setInterval(() => {
      if (lastActive && Date.now() - lastActive > 600000) { 
        dispatch(logout()); 
      }
    }, 60000); 

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      clearInterval(interval);
    };
  }, [dispatch, lastActive]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
