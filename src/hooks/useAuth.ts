import { useAuthStore } from "@/context/AuthContext";

export const useAuth = () => {
  const { token, setToken, clearToken } = useAuthStore();

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/users/login/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // ✅ Debugging

      if (response.ok && data.access_token) {
        setToken(data.access_token);
        localStorage.setItem("token", data.access_token);  // ✅ Ensure token is stored
        localStorage.setItem("is_admin", data.is_admin ? "true" : "false"); 
      } else {
        throw new Error(data.detail || "Invalid credentials");
      }

      return data;
    
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Login failed:", error.message);
  } else {
    console.error("Login failed:", error);
  }
  return null;
}


  };

  return { token, login, clearToken };};
