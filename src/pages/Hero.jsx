import React from 'react';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';     
import '../Hero.css'  
import SearchBar from './Searchbar';   
import Carousel from './Carousel';    
import ScrollableGrid from './ScrollableGrid';      
import { Typography } from '@mui/material';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="avatar-container">
        <Avatar className="avatar" src="/path/to/avatar.jpg" alt="User Avatar" />
      </div>

      <div className="dark-mode-switch-container">
        <Switch className="dark-mode-switch" color="default" />
      </div>

      <SearchBar />
      <Carousel />

      <div className="grid-caption">
      <Typography variant="h6" sx={{ textAlign: 'left', margin: 0, color: 'beige'}}>Blockchain</Typography>
      </div>

      <ScrollableGrid />

    </div>
  );
};

export default Hero;
