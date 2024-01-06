import React from 'react';
import { Paper, Typography } from '@mui/material';

const ItemInfo = ({ itemName, itemType, seedCost, energyCost, sellValue }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        {itemName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Type: {itemType}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Seed Cost: {seedCost}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Energy Cost: {energyCost}
      </Typography>
      <Typography variant="subtitle1">
        Sell Value: {sellValue}
      </Typography>
    </Paper>
  );
};

export default ItemInfo;
