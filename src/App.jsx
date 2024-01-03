import './App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import {Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App;
