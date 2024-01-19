// userService.js
import axios from "axios";

const baseUrl = "/users";

async function register(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}
async function login(credentials) {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
}
const fetchFavoriteItems = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}/favorite-items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return [];
  }
};
async function addToFavorites(userId, itemId, authToken) {
  const response = await axios.post(
    `/users/${userId}/add-favorite-item`,
    { itemId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
}
async function removeFromFavorites(userId, itemId, authToken) {
  const response = await axios.delete(`/users/${userId}/remove-favorite-item`, {
    data: { itemId },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
}
async function createTaskForUser(userId, itemId, quantity, authToken) {
  try {
    const response = await axios.post(
      `${baseUrl}/${userId}/create-task`,
      { itemId, quantity: Number(quantity) },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error.message);
    throw error;
  }
}
async function deleteTask(userId, taskId, authToken) {
  try {
    const response = await axios.delete(
      `${baseUrl}/${userId}/delete-task`,
      { taskId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error.message);
    throw error;
  }
}

async function fetchUserTasks(userId, authToken) {
  try {
    const response = await axios.get(`${baseUrl}/${userId}/tasks`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user tasks:", error.message);
    throw error;
  }
}
export default {
  register,
  login,
  fetchFavoriteItems,
  addToFavorites,
  removeFromFavorites,
  createTaskForUser,
  fetchUserTasks,
  deleteTask,
};
