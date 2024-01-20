// TaskList.jsx
import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { Typography, List, ListItem, Divider } from '@mui/material';

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

  return (
    <div>
      <Typography variant="h4" style={{ color: '#fff' }}>
        Task List
      </Typography>

      <List>
        {tasks.map((task) => (
          <div key={task.id}>
            <ListItem>
              <Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Item: {task.itemName}
              </Typography>
              <Typography variant="subtitle1" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Quantity: {task.quantity}
              </Typography>
              {/* Display other item properties here */}
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
