// import { useState } from "react";
// import { useLikePost, useAddComment } from "@/hooks/usePosts";

// export default function LikeComment({ post, token }: { post: any; token: string | null }) {
//   const likePost = useLikePost();
//   const addComment = useAddComment();
//   const [commentText, setCommentText] = useState("");

//   const handleLike = () => {
//     if (!token) {
//       alert("You must be logged in to like posts.");
//       return;
//     }
//     likePost.mutate(post.id);
//   };

//   const handleCommentSubmit = () => {
//     if (!token) {
//       alert("You must be logged in to comment.");
//       return;
//     }
//     if (commentText.trim()) {
//       addComment.mutate({ postId: post.id, comment: commentText });
//       setCommentText(""); // Clear input after submitting
//     }
//   };

//   return (
//     <div className="mt-4">
//       {/* ✅ Like Button */}
//       <button onClick={handleLike} className="bg-blue-500 text-white px-3 py-1 rounded">
//         👍 {post.likes ? post.likes.length : 0} Likes
//       </button>

//       {/* ✅ Comments Section (Visible to Everyone) */}
//       <div className="mt-4 border-t pt-3">
//         <h3 className="font-semibold">Comments:</h3>
//         {post.comments?.length > 0 ? (
//           post.comments.map((c: any, index: number) => (
//             <p key={index} className="border-b py-1 text-gray-700">{c.comment_text}</p>
//           ))
//         ) : (
//           <p className="text-gray-500">No comments yet.</p>
//         )}
//       </div>

//       {/* ✅ Add Comment (Only for Logged-in Users) */}
//         <div className="mt-3">
//           <input
//             type="text"
//             placeholder="Write a comment..."
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             className="border p-2 rounded w-full"
//           />
//           <button onClick={handleCommentSubmit} className="bg-green-500 text-white px-3 py-1 rounded mt-2">
//             Comment
//           </button>
//         </div>
//     </div>
//   );
// }
