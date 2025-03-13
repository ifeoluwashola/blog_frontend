import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const API_URL = "http://127.0.0.1:8000/api/v1/posts";

export const usePosts = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["posts", page],
        queryFn: async () => {
            const response = await fetch(`${API_URL}?limit=${limit}&offset=${(page - 1) * limit}`);
            if (!response.ok) throw new Error("Failed to fetch posts");
            return response.json();
        },
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    const { token } = useContext(AuthContext)!;
    
    return useMutation({
        mutationFn: async ({ title, content }: { title: string; content: string }) => {
            const response = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });
            if (!response.ok) throw new Error("Failed to create post");
            return response.json();
        },
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    const { token } = useContext(AuthContext)!;

    return useMutation({
        mutationFn: async ({ postId, title, content }: { postId: number; title: string; content: string }) => {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });
            if (!response.ok) throw new Error("Failed to update post");
            return response.json();
        },
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    const { token } = useContext(AuthContext)!;

    return useMutation({
        mutationFn: async (postId: number) => {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to delete post");
        },
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });
};

export const useLikePost = () => {
    const queryClient = useQueryClient();
    const { token } = useContext(AuthContext)!;
    
    return useMutation({
        mutationFn: async (postId: number) => {
            const response = await fetch(`${API_URL}/${postId}/like`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to like post");
            return response.json();
        },
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });
};

export const useAddComment = () => {
    const queryClient = useQueryClient();
    const { token } = useContext(AuthContext)!;

    return useMutation({
        mutationFn: async ({ postId, comment }: { postId: number; comment: string }) => {
            const response = await fetch(`${API_URL}/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    comment_text: comment,
                    id: 0,
                    post_id: postId,
                    user_id: 0,
                    created_at: new Date().toISOString(),
                }),
            });
            if (!response.ok) throw new Error(`Failed to add comment: ${response.statusText}`);
            return response.json();
        },
        onSuccess: () => queryClient.invalidateQueries(["posts"]),
    });
};
