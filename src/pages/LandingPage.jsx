import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function LandingPage({ user, setUser }) {
  const navigate = useNavigate();

  // Return user to login if there is no user logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  //logout Logged in user
  const handleLogout = () => {
    window.localStorage.removeItem('loggedPcUser');
    setUser(null);
  };

  //Fetch items in database
  useEffect(() => {
    // Fetch data from your backend API
    axios.get('/item')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div>
        {user ? (
          <p>Hi! {user.name}</p>
        ) : (
          <p>Hi! Please log in.</p>
        )}
        <Button onClick={handleLogout}>Log out</Button>
      </div>


    </div>
  );
};

export default LandingPage;
