import React, { useState, useEffect } from 'react';
import ItemDesign from './ItemDesign';

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      {items.map((item, index) => (
        <ItemDesign key={index} {...item} />
      ))}
    </div>
  );
};

export default Items;
