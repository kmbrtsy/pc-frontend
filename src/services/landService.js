import axios from "axios";

const baseUrl = "http://localhost:3001";

export async function getLands() {
  const response = await axios.get(`${baseUrl}/lands`);
  console.log(response.data);
  return response.data;
}
