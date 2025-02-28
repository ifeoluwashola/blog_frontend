import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";
import { apiClient } from "@/lib/api"; 

export default function AdminDashboard() {
    const { token, clearToken } = useAuth();
    const router = useRouter();
    const { data: posts, isLoading, error } = usePosts();

    useEffect(() => {
        const isAdmin = localStorage.getItem("is_admin") === "true";
        if (!token || !isAdmin) {
            router.push("/"); // ✅ Redirect non-admins to Blog Home
        }
    }, [token, router]);

    const handleLogout = () => {
        clearToken();
        localStorage.removeItem("is_admin"); // ✅ Clear admin flag
        router.push("/auth/login");
    };

    if (!token) return <p>Redirecting...</p>;

    const handleDeletePost = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const token = localStorage.getItem("token");
            await apiClient.delete(`/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Post deleted successfully!");
            router.reload();
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="space-x-2">
                    <Link href="/admin/signup">
                        <button className="bg-purple-500 text-white px-4 py-2 rounded">
                            ➕ Create New Admin
                        </button>
                    </Link>
                    <Link href="/admin/create">
                        <button className="bg-green-500 text-white px-4 py-2 rounded">
                            ➕ Create New Post
                        </button>
                    </Link>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            </div>

            <div className="mt-6">
                {isLoading && <p>Loading posts...</p>}
                {error && <p className="text-red-500">Error loading posts.</p>}

                <div className="space-y-4">
                    {posts?.map((post: any) => (
                        <div key={post.id} className="border p-4 rounded-lg flex justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-gray-700 mt-2">{post.content}</p>
                            </div>
                            <div className="space-x-2">
                                <Link href={`/admin/edit/${post.id}`}>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDeletePost(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
