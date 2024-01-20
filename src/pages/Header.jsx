// Header.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';

const Header = ({ handleLogout }) => {
  return (
    <AppBar position="static" sx={{ zIndex: 2, backgroundColor: '#080815' }}>
      <Toolbar className="navbar-toolbar" sx={{ justifyContent: 'space-between' }}>
        <Stack direction={{ xs: 'row', md: 'row' }} spacing={{ xs: 1, md: 2 }} alignItems="center">
          <Button color="inherit" sx={{ fontSize: 15 }} component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" sx={{ fontSize: 15 }} component={Link} to="/calculator">
            Calculator
          </Button>
          <Button color="inherit" sx={{ fontSize: 15 }} component={Link} to="/tasks">
            Task
          </Button>
          <Button color="inherit" sx={{ fontSize: 15 }} component={Link} to="/lands">
            Lands
          </Button>
        </Stack>
        <Button color="inherit" sx={{ fontSize: 15 }} onClick={handleLogout}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
