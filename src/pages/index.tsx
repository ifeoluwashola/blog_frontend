import { useRouter } from "next/router";
import usePosts from "../hooks/usePosts";
import PostCard from "../components/PostCard/PostCard";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { posts, likePost, addComment } = usePosts();
  const router = useRouter();
  const { user, logoutUser } = useContext(AuthContext)!;

  return (
    <div className="container mx-auto p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tech Blog</h1>
        <div>
          {user ? (
            <button
              onClick={logoutUser}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Register
              </button>
            </>
          )}
        </div>
      </header>

      {/* Post List */}
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={likePost} onComment={addComment} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
