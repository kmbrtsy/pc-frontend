import React, { useEffect, useState } from 'react'
import { getItems } from '../services';
import { createTask } from '../services/taskService';
import { TextField } from '@mui/material';

export default function ItemCalculator() {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [calculatedValues, setCalculatedValues] = useState([]);

  // Fetch items in database
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItem();
  }, []);

  useEffect(() => {
    const calculatedValues = items.map(item => {
      console.log("Item:", item); // Log the entire item object
      return {
        itemId: item.id, // Assuming _id is an ObjectId in MongoDB
        itemName: item.itemName,
        itemType: item.itemType,
        energyCost: item.energyCost * quantity,
        seedCost: item.seedCost * quantity,
        sellValue: item.sellValue * quantity,
      };
    });

    setCalculatedValues(calculatedValues);
  }, [quantity, items]);

  const addToDo = async (calculatedItem) => {
    try {

      await createTask({
        itemId: calculatedItem.itemId,
        quantity: calculatedItem.quantity,
      });

      console.log('Added to to-do list:', calculatedItem);
    } catch (error) {
      console.error('Error adding to to-do list:', error);
    }
  };

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
            <button>
              add to favorites
            </button>
            <button onClick={() => addToDo(calculatedItem)}>
              add to do
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
};