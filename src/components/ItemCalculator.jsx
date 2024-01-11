import React, { useEffect, useState } from 'react';
import { getItems } from '../services';
import { Grid, TextField, Typography, Button, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      color: '#fff'
    }}>
      <Typography
        variant="h4"
        style={{ color: '#fff' }}>
        Calculator</Typography>
      <TextField
        placeholder='Quantity'
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{
          color: '#fff',
          backgroundColor: '#fff',
          fontSize: '14px',
          borderRadius: '5px',
          width: '150px',
        }} />

      <Grid container spacing={2}>
        {calculatedValues.map((calculatedItem, index) => (
          <Grid
            item
            xs={12} sm={6} md={4} lg={3}
            key={index}>

            <List
              style={{
                display: 'grid',
                gap: '10px', // Adjust gap as needed
                fontSize: '12px'
              }}
            >
              <ListItem key={index}>
                <Box border={0} p={2}
                  sx={{
                    width: '100%',
                    backgroundColor: '#003366',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}>
                    <Button
                      onClick={() => addToFavorites(calculatedItem.itemName)}
                      style={{
                        padding: '0',
                        backgroundColor: 'transparent',
                        minWidth: 'unset',
                      }}
                    >
                      <FavoriteIcon
                        style={{
                          fontSize: '1rem',
                          color: favoriteStates[calculatedItem.itemName] ? 'red' : 'black',
                        }}
                      />
                    </Button>
                    <Button onClick={() => addToDoList(calculatedItem.itemName)}
                      style={{
                        padding: '0',
                        minWidth: 'unset'
                      }}>
                      <AddCircleOutlineIcon
                        style={{ fontSize: '1rem', }} />
                    </Button>
                  </div>

                  <ListItemText
                    primary={<Typography
                      variant="subtitle1"
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>  {calculatedItem.itemName} </Typography>} />
                  <ListItemText
                    primary={<Typography
                      variant="subtitle1"
                      style={{ fontSize: '12px' }}>
                      Type: {calculatedItem.itemType} </Typography>} />
                  <Divider />

                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}>Energy Cost:</Typography>
                  <Paper
                    elevation={3}
                    style={{ padding: '10px', marginBottom: '10px' }}>

                    <Typography style={{ fontSize: '12px' }}>
                      {calculatedItem.energyCost}
                    </Typography>
                  </Paper>

                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}>
                    Seed Cost:</Typography>
                  <Paper
                    elevation={3}
                    style={{ padding: '10px', marginBottom: '10px' }}>
                    <Typography style={{ fontSize: '12px' }}>
                      {calculatedItem.seedCost}
                    </Typography>
                  </Paper>

                  <Typography variant="subtitle1"
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>Sell Value:</Typography>
                  <Paper
                    elevation={3}
                    style={{ padding: '10px', marginBottom: '10px' }}>
                    <Typography style={{ fontSize: '12px' }}>
                      {calculatedItem.sellValue}
                    </Typography>
                  </Paper>
                </Box>
              </ListItem>
              <Divider />
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
