// LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import ItemCalculator from '../components/ItemCalculator.jsx';
import Header from './Header.jsx';

function LandingPage({ user, setUser }) {
  const navigate = useNavigate();

  // Return user to login if there is no user logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // logout Logged in user
  const handleLogout = () => {
    window.localStorage.removeItem('loggedPcUser');
    setUser(null);
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <ItemCalculator />
    </div>
  );
}

export default LandingPage;
