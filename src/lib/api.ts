import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetchPosts = async () => {
    try {
      const response = await apiClient.get("/posts/");
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Fetch Error:", error); // Logs full error
      if (axios.isAxiosError(error)) {
        console.error("Axios Error Details:", error.toJSON());
      }
      throw error;
    }
  };
  