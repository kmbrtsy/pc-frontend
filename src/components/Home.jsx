import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import Header from '../pages/Header';

function Home() {
  return (
    <div>
      <Header />
      <Grid container spacing={4} sx={{padding: '40px', paddingTop: '0'}} >
        {/* Row 1: Image */}
        <Grid item xs={12}>
          {/* Replace 'your-image-url' with the actual image URL */}
          <img
            src="https://i.pinimg.com/564x/0a/ca/2e/0aca2e2ea7f55f59c4df00812de524ec.jpg"
            alt="Your Image"
            style={{ width: '100%', height: '300px' }}
          />
        </Grid>

        {/* Row 2: YouTube Links */}
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '10px' }}>
            {/* Replace 'YOUR_YOUTUBE_VIDEO_ID_1' with the actual YouTube video ID */}
            <iframe
              title="YouTube Live Stream"
              width="100%"
              height="300px"
              src={`https://www.youtube.com/embed/1eIZ5dNlDdM`}
              frameBorder="0"
              allowFullScreen
            ></iframe>

          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '10px' }}>
            {/* Replace 'YOUR_YOUTUBE_VIDEO_ID_2' with the actual YouTube video ID */}
            <iframe
              title="YouTube Video"
              width="100%"
              height="300px"
              src={`https://www.youtube.com/embed/UBM_ccyutus`}
              frameBorder="0"
              allowFullScreen
            ></iframe>

          </Paper>
        </Grid>

        
      </Grid>
    </div>
  );
}

export default Home;
