import axios from "axios";

const baseUrl = "http://localhost:3001";

export async function getItems() {
  const response = await axios.get(`${baseUrl}/item`);
  return response.data;
}
