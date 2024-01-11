import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Avatar, Typography, Container, Paper, Tab, Tabs } from '@mui/material';

const HeaderContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(0, 172, 238, 0.7)', // Transparent blue color
  overflow: 'hidden',
  position: 'relative',
  height: '200px',
  [theme.breakpoints.down('sm')]: {
    height: '150px', // Adjust height for smaller screens
  },
}));

const CoverPhoto = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '50%', // Maintain a 2:1 aspect ratio for the cover photo
  position: 'relative',
  backgroundImage: 'url("https://img.freepik.com/free-vector/alien-planet-landscape-space-game-background_107791-1847.jpg?w=900&t=st=1704522227~exp=1704522827~hmac=18aafede44d4ada4beb0179f5e4a7405c2cb1668d9a43cc98177683c55345f0d")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const UserInfoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end', // Align content to the bottom
  position: 'absolute',
  bottom: 15, // Align to the bottom
  width: '100%',
  paddingLeft: theme.spacing(2),
}));


const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  border: '2px solid #fff',
  marginTop: -theme.spacing(3.5),
}));

const NavigationTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background
  color: '#fff',
  position: 'absolute',
  bottom: 0,
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    // Adjust styles for smaller screens
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));


const Header = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" elevation={0} style={{ borderBottom: 'none', backgroundColor: 'transparent' }}>
      <Toolbar style={{ backgroundColor: 'transparent' }}>
        <Container maxWidth="md" style={{ backgroundColor: 'transparent' }}>
          <HeaderContainer>
            <CoverPhoto />
            <UserInfoContainer>
              {/* <AvatarStyled alt="User Avatar" src="/path/to/your/avatar.jpg" /> */}
            </UserInfoContainer>
            <NavigationTabs value={value} onChange={handleChange} style={{ color: 'white' }}>
              <Tab style={{ color: 'white' }} label="Home" />
              <Tab style={{ color: 'white' }} label="Calculator" />
              <Tab style={{ color: 'white' }} label="Tasks List" />
              <Tab style={{ color: 'white' }} label="Guide" />
            </NavigationTabs>
          </HeaderContainer>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
