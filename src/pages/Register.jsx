import { Container, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import userService from '../services/userService.js';

function Register({ user }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Return user to landingpage if user is logged
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
      console.log(res)

      navigate("/login");
      setName("");
      setUsername("");
      setPassword("");
    });
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Register an account
      </Typography>

      <form onSubmit={handleRegistration}>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        />

        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>

      <Typography variant="body2" align="center" gutterBottom>
        Already have an account?{' '}
        <Link to="/login" color="primary">
          Login here
        </Link>
      </Typography>
    </Container>
  )
}

export default Register
