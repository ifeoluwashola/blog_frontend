// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { fetchPosts } from "@/lib/api";

// const API_URL = "http://127.0.0.1:8000/api/v1/posts";

// export const usePosts = (page: number, limit: number = 10) => {
//     return useQuery({
//       queryKey: ["posts", page], // ✅ React Query cache key based on page
//       queryFn: () => fetchPosts(page, limit),
//       keepPreviousData: true, // ✅ Prevent flickering while changing pages
//     });
//   };

// export const useLikePost = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async (postId: number) => {
//             const token = localStorage.getItem("token");
//             if (!token) throw new Error("User is not authenticated");

//             const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${postId}/like`, {
//                 method: "POST",
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (!response.ok) throw new Error("Failed to like post");

//             return response.json();
//         },
//         onSuccess: () => queryClient.invalidateQueries(["posts"]), // ✅ Ensure likes update immediately
//     });
// };

// export const useAddComment = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ postId, comment }: { postId: number; comment: string }) => {
//             const token = localStorage.getItem("token");
//             if (!token) throw new Error("User is not authenticated");

//             const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${postId}/comment`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     comment_text: comment,
//                     id: 0,  // ✅ Backend requires this field
//                     post_id: postId,  // ✅ Include post ID
//                     user_id: 0,  // ✅ Set default user_id (backend will override)
//                     created_at: new Date().toISOString(),  // ✅ Send timestamp
//                 }),
//             });

//             if (!response.ok) throw new Error(`Failed to add comment: ${response.statusText}`);
//             return response.json();
//         },
//         onSuccess: () => queryClient.invalidateQueries(["posts"]),
//     });
// };

// export const useFilteredPosts = (filters: { title?: string; author_id?: number; start_date?: string; end_date?: string }) => {
//     return useQuery({
//       queryKey: ["filteredPosts", JSON.stringify(filters)], // ✅ Ensure correct cache key
//       queryFn: async () => {
//         const params = new URLSearchParams();
//         if (filters.title) params.append("title", filters.title);
//         if (filters.author_id) params.append("author_id", String(filters.author_id));
//         if (filters.start_date) params.append("start_date", filters.start_date);
//         if (filters.end_date) params.append("end_date", filters.end_date);
  
//         const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/filter/?${params.toString()}`);
//         if (!response.ok) throw new Error("Failed to fetch filtered posts");
  
//         const data = await response.json();
//         return data || { posts: [] }; // ✅ Always return valid structure
//       },
//     });
// };



