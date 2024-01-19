import axios from "axios";

const fetchFavoriteItems = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}/favorite-items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return [];
  }
};

export { fetchFavoriteItems };
