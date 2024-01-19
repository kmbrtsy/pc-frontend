import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ScrollableGrid = () => {
  const data = [
    { src: 'https://i.pinimg.com/564x/df/b2/67/dfb2673836907327effc8caba9b658c9.jpg', caption: 'Caption 1' },
    { src: 'https://i.pinimg.com/564x/0b/74/6c/0b746c06717f244ed809885e7115c152.jpg', caption: 'Caption 2' },
    { src: 'https://i.pinimg.com/564x/ff/51/fe/ff51fe96da38b363ee713bcf6cbe5c44.jpg', caption: 'Caption 3' },
    { src: 'https://i.pinimg.com/564x/29/76/2d/29762d4280b7502afca0e237b9977272.jpg', caption: 'Caption 4' },
  ];

  return (
    <div className="scrollable-grid-container">
      <div className="scrollable-grid">
        {data.map((item, index) => (
          <Paper key={index} className="grid-item">
            <Box position="relative">
              <img src={item.src} alt={`Image ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="subtitle1" className="image-caption">
                {item.caption}
              </Typography>
            </Box>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default ScrollableGrid;
