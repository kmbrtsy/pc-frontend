import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <TextField
        className="search-input"
        label="Search"
        variant="outlined"
        fullWidth
        size="small"
      />
    </div>
  );
};

export default SearchBar;
