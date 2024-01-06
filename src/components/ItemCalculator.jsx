import React, { useEffect, useState } from 'react'
import { getItems } from '../services';
import { TextField, Typography, Button, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { Box, display } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function ItemCalculator() {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);


  // Fetch items in database
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItems();
        setItems(data); // Set the fetched items in state
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

  const addToFavorites = (itemName, index) => {
    // Implement logic to add item to favorites
    console.log(`${itemName} added to favorites`);
    const updatedFavoriteStates = [...favoriteStates];
    updatedFavoriteStates[index] = !updatedFavoriteStates[index];
    setFavoriteStates(updatedFavoriteStates);
  };

  const addToDoList = (itemName) => {
    // Implement logic to add item to to-do list
    console.log(`${itemName} added to to-do list`);
  };

  return (
    <div>
      <Typography variant="h4">Calculator</Typography>
      <TextField
        placeholder='Quantity'
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)} />

      <List  style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 0fr))', // Responsive grid
             gap: '5px', // Adjust as needed
          }}>
          {calculatedValues.map((calculatedItem, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Box border={1} p={2} sx={{ width: '100%' }}>
                  {/* Add your item image here */}
                  <div style={{display: 'flex', flexDirection:'row', alignItems:'center', justifyContent: 'flex-end'}}>
                    <Button
                      onClick={() => addToFavorites(calculatedItem.itemName, index)}
                      style={{
                        marginRight: '4px',
                        backgroundColor: 'transparent',
                      }}
                    >
                    <FavoriteIcon style={{ color: favoriteStates[index] ? 'red' : 'black' }} />
                    </Button>                
                      <Button
                        onClick={() => addToDoList(calculatedItem.itemName)}
                      >
                        <AddCircleOutlineIcon />
                    </Button>               
                  </div>
                  <ListItemText primary={`Item Name: ${calculatedItem.itemName}`} />
                  <ListItemText primary={`Item Type: ${calculatedItem.itemType}`} />
                  <Divider/>

                  <Typography variant="subtitle1">Energy Cost:</Typography>
                    <Paper elevation={3} 
                          style={{ padding: '10px', marginBottom: '10px' }}>
                          <Typography>
                          {calculatedItem.energyCost}
                          </Typography>
                    </Paper> 

                    <Typography variant="subtitle1">Seed Cost:</Typography>
                    <Paper elevation={3} 
                          style={{ padding: '10px', marginBottom: '10px' }}>
                          <Typography>
                          {calculatedItem.seedCost}
                          </Typography>
                    </Paper> 

                    <Typography variant="subtitle1">Sell Value:</Typography>
                    <Paper elevation={3} 
                          style={{ padding: '10px', marginBottom: '10px' }}>
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

    </div>
  )
};