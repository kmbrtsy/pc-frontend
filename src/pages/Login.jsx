import { Container, Typography, TextField, Button, } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Login to your account
      </Typography>

      <form>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
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
