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

export default {
  register,
  login,
  fetchFavoriteItems,
  addToFavorites,
};
