import { useState } from "react";
import { useRouter } from "next/router";
import { apiClient } from "@/lib/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("DEBUG: Create Post button clicked!"); // ✅ Debugging
    setError("");
  
    try {
      const token = localStorage.getItem("token");
      console.log("DEBUG: Retrieved Token:", token); // ✅ Debugging
  
      if (!token) {
        setError("You are not logged in. Please log in.");
        return;
      }
  
      const response = await fetch("http://127.0.0.1:8000/api/v1/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
  
      console.log("DEBUG: Create Post Response Status:", response.status); // ✅ Debugging
  
      if (response.status === 201) {
        router.push("/admin");
      } else {
        const data = await response.json();
        setError(data.detail || "Failed to create post.");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Something went wrong. Please try again.");
    }
  };
      

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleCreatePost} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
}
