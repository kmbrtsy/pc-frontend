import React, { useEffect, useState } from 'react';
import { getLands } from '../services/landService';
import { Typography, List, ListItem, Divider, Paper } from '@mui/material';
import Header from '../pages/Header';

export default function Lands() {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const data = await getLands();
        setLands(data);
      } catch (error) {
        console.error('Error fetching Lands:', error);
      }
    };

    fetchLands();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: '20px', minHeight: '100vh', color: '#191830' }}>

        <List>
          {lands.map((land) => (
            <div key={land.id}>
              <ListItem>
                <Paper
                  elevation={3}
                  style={{
                    backdropFilter: 'blur(5px)', // Adjust the blur value as needed
                    borderRadius: '10px', // Optional: add borderRadius for a rounded corner effect
                    padding: '10px', // Optional: adjust padding as needed
                    width: '300px',
                    backgroundColor: '#080820',
                    color: 'whitesmoke'
                  }}
                >
                  <Typography variant="h4" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    Land: #{land.landNumber}
                  </Typography>
                  <Typography variant="h5" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Description: {land.landDescription || 'N/A'}
                  </Typography>
                  <Typography variant="h5" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Type: {land.landtype}
                  </Typography>
                  <Typography variant="h5" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Industries: {land.landIndustries || 'N/A'}
                  </Typography>
                </Paper>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
