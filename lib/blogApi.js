const API = "/api";

/* ── Fetch helper (cookies are automatic) ── */
const apiFetch = async (path, options = {}) => {
  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `API error ${res.status}`);
  return data;
};

/* ── Auth ── */
export const login = (email, password) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const logout = () => apiFetch("/auth/logout", { method: "POST" });

export const getMe = () => apiFetch("/auth/me");

/* ── Public ── */
export const getPublishedPosts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/posts${qs ? `?${qs}` : ""}`);
};

export const getPostBySlug = (slug) => apiFetch(`/posts/slug/${slug}`);

/* ── Admin ── */
export const getAllPostsAdmin = (params = {}) => {
  const qs = new URLSearchParams({ ...params, status: "all" }).toString();
  return apiFetch(`/posts?${qs}`);
};

export const getPostByIdAdmin = (id) => apiFetch(`/posts/${id}`);

export const createPost = (data) =>
  apiFetch("/posts", { method: "POST", body: JSON.stringify(data) });

export const updatePost = (id, data) =>
  apiFetch(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deletePost = (id) =>
  apiFetch(`/posts/${id}`, { method: "DELETE" });

/* ── Utils ── */
export const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
