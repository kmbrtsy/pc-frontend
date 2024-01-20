// Header.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const Header = ({ handleLogout }) => {
  return (
    <AppBar position="static" sx={{ zIndex: 2, backgroundColor: '#080815' }}>
      <Toolbar className="navbar-toolbar">
        <Stack direction={{ xs: 'row', md: 'row' }} spacing={{ xs: 1, md: 2 }} alignItems="center">
          <Button color="inherit" sx={{ fontSize: 15 }}>
            Home
          </Button>
          <Button color="inherit" sx={{ fontSize: 15 }}>
            Calculator
          </Button>
          <Button color="inherit" sx={{ fontSize: 15 }}>
            Task
          </Button>
          <Button color="inherit" sx={{ fontSize: 15 }}>
            Guide
          </Button>
          <Button color="inherit" sx={{ fontSize: 15, marginLeft: 'auto' }} onClick={handleLogout}>
            Log Out
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
