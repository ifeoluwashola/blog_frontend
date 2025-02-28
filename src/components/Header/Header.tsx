import Link from "next/link";
import { useAuthStore } from "@/context/AuthContext";

export default function Header() {
  const { token, clearToken } = useAuthStore();
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("is_admin") === "true";

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-xl font-bold">Blog</Link>
      <div className="space-x-4">
        {token ? (
          <>
            {isAdmin && <Link href="/admin">Admin Dashboard</Link>}
            <button onClick={clearToken} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
