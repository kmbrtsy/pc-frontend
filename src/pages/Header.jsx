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
  backgroundImage: 'url("https://i.pinimg.com/564x/f2/72/94/f272943e5355a948e9430a8c79e6f1cb.jpg")',
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
    <Paper elevation={0} square>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md">
            <HeaderContainer>
              <CoverPhoto />
              <UserInfoContainer>
                <AvatarStyled alt="User Avatar" src="/path/to/your/avatar.jpg" />
              </UserInfoContainer>
              <NavigationTabs value={value} onChange={handleChange}>
                <Tab label="Home" />
                <Tab label="Profile" />
                <Tab label="Tools" />
                <Tab label="Guide" />
              </NavigationTabs>
            </HeaderContainer>
          </Container>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

export default Header;
