import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { token, clearToken } = useAuth();
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
        <div className="flex justify-between mb-6">
        {!token ? (
          <>
            <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-green-500 text-white rounded">
              Signup
            </Link>
          </>
        ) : (
          <button onClick={clearToken} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post: any) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
              <a href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
