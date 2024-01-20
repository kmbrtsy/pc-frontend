import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService.js';
import backgroundImage from '../images/rawnin.png';

function Register({ user }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Return user to the landing page if the user is logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegistration = (e) => {
    e.preventDefault();

    const credentials = {
      name,
      username,
      password
    };

    userService.register(credentials).then((res) => {
      console.log(res);
      navigate("/login");
      setName("");
      setUsername("");
      setPassword("");
    });
  };

  return (
    <Container maxWidth="md" style={{ display: 'flex', height: '100vh' }}>
      {/* Left half - Image */}
      <div style={{ flex: 1, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }} />

      {/* Right half - Register form */}
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', background: '#080811', color: '#fff' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Register an account
        </Typography>

        <form onSubmit={handleRegistration} style={{ width: '100%' }}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{ style: { color: '#080811', borderRadius: '5px' } }}
          />

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
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#fff' }}>
            Login here
          </Link>
        </Typography>
      </div>
    </Container>
  );
}

export default Register;
