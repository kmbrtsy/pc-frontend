// ItemCalculator.jsx
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
import userService from '../services/userService';

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
  const [user, setUser] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    // Retrieve the user from local storage
    const storedUser = JSON.parse(window.localStorage.getItem('loggedPcUser'));

    if (storedUser) {
      console.log('(3)User ID:', storedUser.id);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItems();
        const initialItems = data.map(item => ({ ...initialItemState, ...item }));
        setItems(initialItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItem();
  }, []);

  useEffect(() => {
    const fetchUserFavoriteItems = async () => {
      if (user) {
        try {
          const favoriteItemsData = await userService.fetchFavoriteItems(user.id);
          setFavoriteItems(favoriteItemsData);
          console.log({ favoriteItemsData });
        } catch (error) {
          console.error('Error fetching favorite items:', error);
        }
      }
    };

    fetchUserFavoriteItems();
  }, [user]);

  useEffect(() => {
    const updatedCalculatedValues = items.map(item => ({
      id: item.id,
      itemName: item.itemName,
      itemType: item.itemType,
      energyCost: item.energyCost * item.quantity,
      seedCost: item.seedCost * item.quantity,
      sellValue: item.sellValue * item.quantity,
    }));

    setCalculatedValues(updatedCalculatedValues);
  }, [items]);

  const isItemInFavorites = (itemId) => {
    return favoriteItems.map(item => item.id).includes(itemId);
  };

  const addToFavorites = async (itemId) => {
    try {
      if (!user) {
        // Handle the case where user is null or undefined
        console.error("User is null or undefined");
        // You might want to redirect the user to the login page or show a message
        return;
      }

      const authToken = user.token;
      await userService.addToFavorites(user.id, itemId, authToken);

      // Refresh favorite items after adding to favorites
      const updatedFavoriteItems = await userService.fetchFavoriteItems(user.id);
      setFavoriteItems(updatedFavoriteItems);
    } catch (error) {
      console.error("Error updating favorites:", error.message);
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
        Calculator
      </Typography>

      <Grid container spacing={2}>
        {calculatedValues.map((calculatedItem) => (
          <Grid
            item
            xs={12} sm={6} md={4} lg={3}
            key={calculatedItem.id}>

            <List
              style={{
                display: 'grid',
                gap: '10px', // Adjust gap as needed
                fontSize: '12px'
              }}
            >
              <ListItem key={calculatedItem.id}>
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
                      onClick={() => addToFavorites(calculatedItem.id)}
                      style={{
                        padding: '0',
                        backgroundColor: 'transparent',
                        minWidth: 'unset',
                      }}
                    >
                      <FavoriteIcon
                        style={{
                          fontSize: '1rem',
                          color: isItemInFavorites(calculatedItem.id) ? 'red' : 'black',
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
