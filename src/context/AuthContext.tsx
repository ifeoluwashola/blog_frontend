// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { login, register, getCurrentUser, createAdmin } from "../lib/api";

interface AuthContextType {
  user: any;
  token: string | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  registerUser: (username: string, password: string) => Promise<boolean>;
  createAdminUser: (username: string, password: string, token: string) => Promise<boolean>;
  logoutUser: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getCurrentUser(storedToken)
        .then((userData) => {
          setUser(userData);
          setIsAdmin(userData.is_admin);
        })
        .catch(() => logoutUser());
    }
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const data = await login(username, password);
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      const userInfo = await getCurrentUser(data.access_token);
      setUser(userInfo);
      setIsAdmin(userInfo.is_admin);
      if (userInfo.is_admin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
      return true
    } catch (error) {
      console.error("Login failed", error);
    }
    return false
  };

  const registerUser = async (username: string, password: string) => {
    try {
      await register(username, password);
      router.push("/login");
      return true
    } catch (error) {
      console.error("Registration failed", error);
    }
    return false
  };

  const createAdminUser = async (username: string, password: string, token: string) => {
    try {
      await createAdmin(username, password, token);
      console.log("Admin user created successfully"); // Debugging log
      return true; // Indicate success
    } catch (error) {
      console.error("Admin creation failed", error);
      return false; // Indicate failure
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, registerUser, createAdminUser, logoutUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
