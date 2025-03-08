// src/lib/api.ts
export const API_URL = "http://localhost:8000/api/v1";

export const fetcher = async (url: string, options = {}) => {
  const res = await fetch(`${API_URL}${url}`, options);
  console.log("Fetching:", url, "Response Status:", res.status);
  if (!res.ok) throw new Error(`API error: ${res.statusText}`);
  return res.json();
};

// Auth APIs
export const login = async (username: string, password: string) => {
  return fetcher("/users/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

export const register = async (username: string, password: string) => {
  return fetcher("/users/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

export const createAdmin = async (username: string, password: string,  token: string) => {
  return fetcher("/users/create-admin/", {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
       },
    body: JSON.stringify({ username, password }),
  });
};

export const getCurrentUser = async (token: string) => {
  return fetcher("/users/me/", {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
  });
};

// Post APIs
export const getPosts = async () => fetcher("/posts");

export const getPostById = async (id: number) => fetcher(`/posts/${id}`);

export const createPost = async (title: string, content: string, token: string) => {
  return fetcher("/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
};

export const updatePost = async (post_id: number, title: string, content: string, token: string) => {
  return fetcher(`/posts/${post_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
};

export const deletePost = async (post_id: number, token: string) => {
  return fetcher(`/posts/${post_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const likePost = async (post_id: number, token: string) => {
  return fetcher(`/posts/${post_id}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addComment = async (post_id: number, comment_text: string, token: string) => {
  return fetcher(`/posts/${post_id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment_text }),
  });
};
