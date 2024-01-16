import React, { useEffect, useState } from 'react';
import { getItems } from '../services';
import {
  Grid,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const initialItemState = {
  itemName: "Your Item Name",
  itemType: "Your Item Type",
  energyCost: 0,
  seedCost: 0,
  sellValue: 0,
  quantity: 1,
};

export default function ItemCalculator() {
  const [items, setItems] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [favoriteStates, setFavoriteStates] = useState({});

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItems();
        // Initialize items with the initialItemState structure
        const initialItems = data.map(item => ({ ...initialItemState, ...item }));

        // Fetch user data including favoriteItems
        const user = await getCurrentUser(); // Implement getCurrentUser() to fetch the logged-in user's data
        const userFavoriteItemIds = user.favoriteItems.map(favoriteItem => favoriteItem.id);

        setItems(initialItems);
        setFavoriteStates(Object.fromEntries(initialItems.map(item => [
          item.itemName,
          userFavoriteItemIds.includes(item.id)
        ])));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItem();
  }, []);

  useEffect(() => {
    const updatedCalculatedValues = items.map(item => ({
      itemName: item.itemName,
      itemType: item.itemType,
      energyCost: item.energyCost * item.quantity,
      seedCost: item.seedCost * item.quantity,
      sellValue: item.sellValue * item.quantity,
    }));

    setCalculatedValues(updatedCalculatedValues);
  }, [items]);

  const addToFavorites = async (itemName) => {
    try {
      const item = items.find(item => item.itemName === itemName);

      // Check if the item is already in favorites
      const isFavorite = favoriteStates[itemName];

      // Update the user's favoriteItems in the database
      const updatedUser = await updateUserFavorites(item.id, isFavorite);

      // Update the local state based on the updated user data
      setFavoriteStates((prevStates) => ({
        ...prevStates,
        [itemName]: !isFavorite,
      }));

      console.log(`${itemName} ${isFavorite ? 'removed from' : 'added to'} favorites`);

    } catch (error) {
      console.error('Error updating favorites:', error);
    }
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

                  <TextField
                    placeholder="Quantity"
                    type="number"
                    value={calculatedItem.quantity}
                    onChange={(e) => {
                      const newQuantity = e.target.value;
                      setItems((prevItems) =>
                        prevItems.map((prevItem) =>
                          prevItem.itemName === calculatedItem.itemName
                            ? { ...prevItem, quantity: newQuantity }
                            : prevItem
                        )
                      );
                    }}
                    style={{
                      color: '#fff',
                      backgroundColor: '#fff',
                      fontSize: '14px',
                      borderRadius: '5px',
                      width: '150px',
                    }}
                  />

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
