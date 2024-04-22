// TaskList.jsx
import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { Typography, List, ListItem, Divider, Paper } from '@mui/material';
import Header from '../pages/Header';

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        if (user) {
          const userTasks = await userService.fetchUserTasks(user.id);
          setTasks(userTasks);
        }
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    fetchUserTasks();
  }, [user]);

  const handleDelete = async (taskId) => {
    try {
      // Make a request to delete the task
      await userService.deleteTask(user.id, taskId);

      // Update the local tasks list
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div >
      <Header />
      <div style={{ padding: '20px', minHeight: '100vh',}}>

        <List>
          {tasks.map((task) => (
            <div key={task.id}>
              <ListItem>
                <Paper
                  elevation={3}
                  style={{
                    backdropFilter: 'blur(5px)', 
                    borderRadius: '10px', 
                    padding: '10px', 
                    width: '200px',
                    backgroundColor: '#080820',
                    color: 'whitesmoke'
                  }}
                >
                  <Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Item: {task.itemName}
                  </Typography>
                  <Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Quantity: {task.quantity}
                  </Typography>
                  {/* Display other item properties here */}
                </Paper>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default TaskList;
