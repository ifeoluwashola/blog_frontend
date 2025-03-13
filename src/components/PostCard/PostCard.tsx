import React from "react";

const PostCard = ({ post, onLike, onComment }: {post: any, onLike: any, onComment: any}) => {
  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p>{post.content}</p>
      <p className="text-sm text-gray-500">{post.likes.length} Likes | {post.comments.length} Comments</p>
      <div className="mt-2">
        <button onClick={() => onLike(post.id)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Like
        </button>
      </div>
      {/* Comment Form */}
      <div className="mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const commentText = (e.target as any).comment.value;
            onComment(post.id, commentText);
            (e.target as any).reset();
          }}
        >
          <input type="text" name="comment" placeholder="Add a comment..." className="w-full p-2 border rounded" required />
          <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded mt-2">Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
