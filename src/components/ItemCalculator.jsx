import React, { useEffect, useState } from 'react'
import { getItems } from '../services';
import { TextField } from '@mui/material';

export default function ItemCalculator() {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // const [plots, setPlots] = useState(60);
  const [calculatedValues, setCalculatedValues] = useState([]);

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
  return (
    <div>
      <h2>Calculator</h2>
      <TextField
        placeholder='Quantity'
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)} />

      <ul>
        {calculatedValues.map((calculatedItem, index) => (
          <li key={index}>
            <img src="" alt="" />
            <p>Item Name: {calculatedItem.itemName}</p>
            <p>Item Type: {calculatedItem.itemType}</p>
            <p>Energy Cost: {calculatedItem.energyCost}</p>
            <p>Seed Cost: {calculatedItem.seedCost}</p>
            <p>Sell Value: {calculatedItem.sellValue}</p>
            <button>favorites</button>
            <button>add to do</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
};