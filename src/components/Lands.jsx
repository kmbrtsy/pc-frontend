// Lands.jsx
import React, { useEffect, useState } from 'react';
import userService from '../services/landService';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const Lands = () => {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        if (user) {
          const data = await userService.getLands(user.id);
          setLands(data);
        }
      } catch (error) {
        console.error('Error fetching Lands:', error);
      }
    };

    fetchLands();
  }, []);

  return (
    <div style={{ padding: '20px', minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h4" style={{ color: '#fff' }}>
        Lands
      </Typography>

      <List>
        {lands.map((land) => (
          <div key={land.id}>
            <ListItem>
              <ListItemText
                primary={`Land Number: ${land.landNumber}`}
                secondary={`Description: ${land.landDescription || 'N/A'}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default Lands;
