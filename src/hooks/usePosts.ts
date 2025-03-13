import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://127.0.0.1:8000/api/v1/posts";

export const usePosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await fetch(API_URL);
            return response.json();
        },
    });
};

export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (postId: number) => {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");

            const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${postId}/like`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to like post");

            return response.json();
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }), // ✅ Ensure likes update immediately
    });
};

export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, comment }: { postId: number; comment: string }) => {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated");

            const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    comment_text: comment,
                    id: 0,  // ✅ Backend requires this field
                    post_id: postId,  // ✅ Include post ID
                    user_id: 0,  // ✅ Set default user_id (backend will override)
                    created_at: new Date().toISOString(),  // ✅ Send timestamp
                }),
            });

            if (!response.ok) throw new Error(`Failed to add comment: ${response.statusText}`);
            return response.json();
        },
        
onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),

    });
};



