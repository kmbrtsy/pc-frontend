import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@mui/material';

function LandingPage({ user, setUser }) {
  const navigate = useNavigate();

  // Return user to login if there is no user logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedPCUser');
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <p>Hi! {user.name}</p>
      ) : (
        <p>Hi! Please log in.</p>
      )}
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default LandingPage;
