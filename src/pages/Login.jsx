import { Container, Typography, TextField, Button, } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import userService from '../services/userService';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      username,
      password
    }

    userService.login(credentials).then((_res) => {
      navigate("/");
      setUsername("");
      setPassword("");
    })
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Login to your account
      </Typography>

      <form onSubmit={handleLogin}>
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
          Login
        </Button>
      </form>

      <Typography variant="body2" align="center" gutterBottom>
        Don't have an account?{' '}
        <Link to="/register" color="primary">
          Register here
        </Link>
      </Typography>
    </Container>
  )
}

export default Login
