import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiClient } from "@/lib/api";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      apiClient.get(`/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(() => setError("Error loading post"));
    }
  }, [id]);

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await apiClient.put(
        `/posts/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        router.push("/admin");
      }
    } catch (err) {
      setError("Failed to update post. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleEditPost} className="space-y-4">
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}
