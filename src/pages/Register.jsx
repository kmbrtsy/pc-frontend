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
    <Container maxWidth="sm"   style={{
    textAlign: 'center',
    background: `url('your-image-url')`, // Replace 'your-image-url' with the actual image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.75,
  }}>
      <Typography variant="h3" align="center" gutterBottom style={{color: '#fff', fontSize: '24px'}}>
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
          style={{ color: '#fff', backgroundColor: '#fff', fontSize: '14px', borderRadius: '5px'}}

        />

        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ color: '#fff', backgroundColor: '#fff', borderRadius: '5px', }}      />


        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ color: '#fff', backgroundColor: '#fff', borderRadius: '5px', }}      />


        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '15px', marginBottom: '15px' }}>
          Register
        </Button>
      </form>

      <Typography variant="body2" align="center" gutterBottom style={{ color: '#fff' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#fff' }}>
          Login here
        </Link>
      </Typography>
    </Container>
  )
}

export default Register
