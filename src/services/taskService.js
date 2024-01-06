import axios from "axios";

const baseUrl = "http://localhost:3001";

export async function createTask(taskData) {
  const response = await axios.post(`${baseUrl}/tasks`, taskData, {
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers, such as authorization if required
    },
  });
  console.log(response.data);
  return response.data;
}
