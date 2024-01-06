import React, { useEffect, useState } from 'react';
import { getItems } from '../services';
import { Grid, TextField, Typography, Button, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './App.css';

export default function ItemCalculator() {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [favoriteStates, setFavoriteStates] = useState({});

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItems();
        setItems(data);
        setFavoriteStates(Object.fromEntries(data.map(item => [item.itemName, false])));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItem();
  }, []);

  useEffect(() => {
    const calculatedValues = items.map(item => ({
      itemName: item.itemName,
      itemType: item.itemType,
      energyCost: item.energyCost * quantity,
      seedCost: item.seedCost * quantity,
      sellValue: item.sellValue * quantity,
    }));

    setCalculatedValues(calculatedValues);
  }, [quantity, items]);

  const addToFavorites = (itemName) => {
    console.log(`${itemName} added to favorites`);
    setFavoriteStates((prevStates) => ({
      ...prevStates,
      [itemName]: !prevStates[itemName],
    }));
  };

  const addToDoList = (itemName) => {
    console.log(`${itemName} added to to-do list`);
  };

  return (
    <div style={{ backgroundColor: '#14213d', padding: '20px', minHeight: '100vh', color: '#fff' }}>
    <Typography variant="h4">Calculator</Typography>
      <TextField
        placeholder='Quantity'
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

<Grid container spacing={2}>
        {calculatedValues.map((calculatedItem, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            

      <List
        style={{
          display: 'grid',
          gap: '10px', // Adjust gap as needed
        }}
      >
        {calculatedValues.map((calculatedItem, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Box border={1} p={2} sx={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => addToFavorites(calculatedItem.itemName)}
                    style={{
                      marginRight: '4px',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <FavoriteIcon
                      style={{
                        color: favoriteStates[calculatedItem.itemName] ? 'red' : 'black',
                      }}
                    />
                  </Button>
                  <Button onClick={() => addToDoList(calculatedItem.itemName)}>
                    <AddCircleOutlineIcon />
                  </Button>
                </div>
                <ListItemText primary={`Item Name: ${calculatedItem.itemName}`} />
                <ListItemText primary={`Item Type: ${calculatedItem.itemType}`} />
                <Divider />

                <Typography variant="subtitle1">Energy Cost:</Typography>
                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                  <Typography>
                    {calculatedItem.energyCost}
                  </Typography>
                </Paper>

                <Typography variant="subtitle1">Seed Cost:</Typography>
                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                  <Typography>
                    {calculatedItem.seedCost}
                  </Typography>
                </Paper>

                <Typography variant="subtitle1">Sell Value:</Typography>
                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                  <Typography>
                    {calculatedItem.sellValue}
                  </Typography>
                </Paper>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      </Grid>
        ))}
      </Grid>
    </div>
  );
}
