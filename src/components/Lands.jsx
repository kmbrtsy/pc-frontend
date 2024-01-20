import React, { useEffect, useState } from 'react';
import { getLands } from '../services/landService';
import {
  Typography,
  List,
  ListItem,
  Divider,
  Paper,
} from '@mui/material';
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
    <div style={{ padding: '20px', minHeight: '100vh', color: '#191830' }}>
      <Typography variant="h4" style={{ color: '#191830' }}>
        Lands
      </Typography>

      <List>
        {lands.map((land) => (
          <ListItem key={land.id}>
            <h4>Land: #{land.landNumber}</h4>
            <h5>Description: {land.landDescription || 'N/A'}</h5>
            <h5>Type: {land.landtype}</h5>
            <h5>Industries: {land.landIndustries || 'N/A'}</h5>
            <Divider />
          </ListItem>
        ))}
      </List>

      <List>
        {lands.map((land) => (
          <ListItem key={land.id}>
            <Paper
              elevation={3}
              style={{
                backdropFilter: 'blur(5px)',
                borderRadius: '10px',
                padding: '10px',
                width: '300px',
                backgroundColor: '#080820',
                color: 'whitesmoke',
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
            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
