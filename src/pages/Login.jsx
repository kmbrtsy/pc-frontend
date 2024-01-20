import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import backgroundImage from '../images/rawnin.png';

function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Return user to the landing page if the user is logged
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      username,
      password,
    };

    userService.login(credentials)
      .then((res) => {
        window.localStorage.setItem('loggedPcUser', JSON.stringify(res));
        setUser(res);
        console.log("Navigating to /");
        navigate('/');
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., display an error message to the user)
      });
  };

  return (
    <Container maxWidth="md" style={{ display: 'flex', height: '100vh' }}>
      {/* Left half - Login form */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', background: '#080811', color: '#fff' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Login to your account
        </Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ style: { color: '#080811', borderRadius: '5px' } }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ style: { color: '#080811', borderRadius: '5px' } }}
          />

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button variant="contained" color="primary" type="submit" style={{ marginTop: '15px', marginBottom: '15px', borderRadius: '5px', backgroundColor: '#FFD700' }}>
                Login
              </Button>
            </div>
        </form>

        <Typography variant="body2" align="center" gutterBottom>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#fff' }}>
            Register here
          </Link>
        </Typography>
      </div>

      {/* Right half - Image */}
      <div style={{ flex: 1, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }} />
    </Container>
  );
}

export default Login;
