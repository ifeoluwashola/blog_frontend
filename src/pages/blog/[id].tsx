// import { useRouter } from "next/router";
// import { useQuery } from "@tanstack/react-query";
// import { apiClient } from "@/lib/api";

// const fetchPost = async (id: string | string[] | undefined) => {
//   if (!id) return null; // Prevent API call if ID is undefined
//   const response = await apiClient.get(`/posts/${id}`);
//   return response.data;
// };

// export default function BlogPost() {
//   const router = useRouter();
//   const { id } = router.query;

//   const { data: post, isLoading, error } = useQuery({
//     queryKey: ["post", id],
//     queryFn: () => fetchPost(id),
//     enabled: !!id, // Only fetch if ID is available
//   });

//   if (isLoading) return <p className="text-center">Loading...</p>;
//   if (error || !post) return <p className="text-center text-red-500">Error loading post.</p>;

//   return (
//     <div className="max-w-3xl mx-auto py-10">
//       <h1 className="text-4xl font-bold">{post.title}</h1>
//       <p className="text-gray-600 mt-2">Published on {new Date(post.created_at).toDateString()}</p>
//       <div className="mt-6">{post.content}</div>
//     </div>
//   );
// }
