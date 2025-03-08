// src/pages/register.tsx
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const Register = () => {
  const { registerUser } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await registerUser(username, password);
    if (success) {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <button type="submit" className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;