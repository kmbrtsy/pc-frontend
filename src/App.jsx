import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from './pages/Register';
import Login from './pages/Login';
import TaskList from './components/TaskList';
import ItemCalculator from './components/ItemCalculator';
import Lands from './components/Lands';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPcUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);


  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} />} />
      <Route path="/register" element={<Register user={user} />} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/home" element={<Home user={user} setUser={setUser} />} />
      <Route path="/calculator" element={<ItemCalculator user={user} />} />
      <Route path="/tasks" element={<TaskList user={user} />} />
      <Route path="/lands" element={<Lands user={user} />} />
    </Routes>
  )
}

export default App;
