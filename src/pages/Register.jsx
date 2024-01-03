import { Container, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Register an account
      </Typography>

      <form>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />

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
