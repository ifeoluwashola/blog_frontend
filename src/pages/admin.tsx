import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const API_URL = "http://localhost:8000/api/v1"
const AdminDashboard = () => {
  const { user, createAdminUser, token } = useContext(AuthContext)!;
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (!user || !user.is_admin) {
      router.push("/");
      return;
    }
    fetchPosts();
  }, [user, page]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts?limit=${limit}&offset=${(page - 1) * limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleCreateOrUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editPostId ? "PUT" : "POST";
    const url = editPostId ? `/posts/${editPostId}` : "/posts/";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      setTitle("");
      setContent("");
      setEditPostId(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving post", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleCreateAdmin = async () => {
    const success = await createAdminUser("newAdmin", "adminPassword", user.token);
    if (success) {
      console.log("Admin user created successfully");
    } else {
      console.log("Failed to create admin user");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={handleCreateAdmin}
        className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 mb-6"
      >
        Create Admin User
      </button>

      {/* Create / Edit Post Form */}
      <form onSubmit={handleCreateOrUpdatePost} className="mb-6">
        <h2 className="text-xl font-semibold">{editPostId ? "Edit Post" : "Create Post"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded my-2"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded my-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {editPostId ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Posts List */}
      <div>
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded mb-4">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            <div className="mt-2">
              <button
                onClick={() => {
                  setEditPostId(post.id);
                  setTitle(post.title);
                  setContent(post.content);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
