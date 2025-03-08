import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const { user, createAdminUser } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    console.log("User in AdminDashboard:", user); // Debugging log
    if (!user || !user.is_superuser) {
      console.log("User is not an admin, redirecting..."); // Debugging log
      // router.push("/");
    }
  }, [user]);

  const handleCreateAdmin = async () => {
    const success = await createAdminUser("newAdmin", "adminPassword", user.token);
    if (success) {
      console.log("Admin user created successfully");
    } else {
      console.log("Failed to create admin user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h2>
        <p className="mt-4 text-center text-gray-600">Manage users, posts, and more.</p>
        <button
          onClick={handleCreateAdmin}
          className="mt-6 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Create Admin User
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;