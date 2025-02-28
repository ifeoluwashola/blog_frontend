import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const data = await fetchPosts();
        console.log("Fetched posts:", data); // ✅ Debugging
        return data;
      } catch (error) {
        console.error("Error fetching posts:", error); // ✅ Debugging
        throw error;
      }
    },
  });
};
