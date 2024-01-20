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
import '../Calculator.css'

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
        const initialItems = data.map(item => ({ ...initialItemState, ...item }));
        setItems(initialItems);
        setFavoriteStates(Object.fromEntries(initialItems.map(item => [item.itemName, false])));
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

  const addToFavorites = (itemName) => {
    setFavoriteStates((prevStates) => ({
      ...prevStates,
      [itemName]: !prevStates[itemName],
    }));

    console.log(`${itemName} ${prevStates[itemName] ? 'removed from' : 'added to'} favorites`);
  };

  const addToDoList = (itemName) => {
    console.log(`${itemName} added to to-do list`);
  };

  return (
    <div className="calculator-container">
      <Typography variant="h5" className="calculator-heading">
        Calculator
      </Typography>

      <Grid container spacing={2}>
        {calculatedValues.map((calculatedItem, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <List className="item-list">
              <ListItem key={index}>
                <Box border={0} p={2} className="item-box">
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button onClick={() => addToFavorites(calculatedItem.itemName)} style={{ padding: '0', backgroundColor: 'transparent', minWidth: 'unset' }}>
                      <FavoriteIcon style={{ fontSize: '1rem', color: favoriteStates[calculatedItem.itemName] ? 'red' : 'black' }} />
                    </Button>
                    <Button onClick={() => addToDoList(calculatedItem.itemName)} style={{ padding: '0', minWidth: 'unset' }}>
                      <AddCircleOutlineIcon style={{ fontSize: '1rem' }} />
                    </Button>
                    
                  </div>

                  <TextField
                    placeholder="0"
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
                      color: 'rgba(255, 255, 255, 0.75)', // Adjust the alpha value (0.75) as needed
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adjust the alpha value (0.1) as needed
                      fontSize: '10px',
                      borderRadius: '20px',
                      width: '100px',
                    }}
                  />

                  <ListItemText
                    primary={<Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: 'bold' }}>{calculatedItem.itemName}</Typography>} />
                  <ListItemText
                    primary={<Typography variant="subtitle1" style={{ fontSize: '12px' }}>Type: {calculatedItem.itemType}</Typography>} />
                  <Divider />

                  <Typography variant="subtitle1" style={{ fontSize: '12px', fontWeight: 'bold' }}>Energy Cost:</Typography>
                  <Paper elevation={3} className="calculation-paper">
                    <Typography style={{ fontSize: '12px' }}>{calculatedItem.energyCost}</Typography>
                  </Paper>

                  <Typography variant="subtitle1" style={{ fontSize: '12px', fontWeight: 'bold' }}>Seed Cost:</Typography>
                  <Paper elevation={3} className="calculation-paper">
                    <Typography style={{ fontSize: '12px' }}>{calculatedItem.seedCost}</Typography>
                  </Paper>

                  <Typography variant="subtitle1" style={{ fontSize: '12px', fontWeight: 'bold' }}>Sell Value:</Typography>
                  <Paper elevation={3} className="calculation-paper">
                    <Typography style={{ fontSize: '12px' }}>{calculatedItem.sellValue}</Typography>
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
