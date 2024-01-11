import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from './pages/Register';
import Login from './pages/Login';
import TaskList from './components/TaskList';
import ItemCalculator from './components/ItemCalculator';

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
      <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
      <Route path="/register" element={<Register user={user} />} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/Calculator" element={<ItemCalculator user={user} setUser={setUser} />} />
      <Route path="/Tasks" element={<TaskList user={user} setUser={setUser} />} />
    </Routes>
  )
}

export default App;
