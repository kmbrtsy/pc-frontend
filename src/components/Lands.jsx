// Lands.jsx
import React, { useEffect, useState } from 'react';
import { getLands } from '../services/landService';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

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
          <div key={land.id}>
            <ListItem>
              <h4>Land: #{land.landNumber}</h4>
              <h5>Description{land.landDescription || 'N/A'}</h5>
              <h5>Type{land.landtype}</h5>
              <h5>Industries{land.landIndustries || 'N/A'}</h5>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}
