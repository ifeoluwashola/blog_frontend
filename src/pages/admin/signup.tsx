import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/v1/users/create-admin/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Only an authenticated admin can create other admins
        },
        body: JSON.stringify({ username, password }), // ✅ Admin account
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/admin");
      } else {
        setError(data.detail || "Admin signup failed.");
      }
    } catch (err) {
      console.error("Admin signup error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register Admin</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Admin
        </button>
      </form>
    </div>
  );
}
