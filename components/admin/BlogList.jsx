"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllPostsAdmin, deletePost } from "@/lib/blogApi";
import { useAdminTheme } from "./adminTokens";

const StatusBadge = ({ status }) => {
  const styles = {
    published: { background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.2)" },
    draft: { background: "rgba(245,158,11,0.1)", color: "#D97706", border: "1px solid rgba(245,158,11,0.2)" },
  };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold"
      style={styles[status] || styles.draft}
    >
      {status}
    </span>
  );
};

const BlogList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshKey = searchParams.get("t");
  const { t } = useAdminTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [sortBy, setSortBy] = useState("updatedAt");

  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    getAllPostsAdmin()
      .then((data) => setPosts(data.posts ?? []))
      .catch((err) => setFetchError(err.message || "Failed to load posts"))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const handleDelete = async (id) => {
    await deletePost(id);
    getAllPostsAdmin().then((data) => setPosts(data.posts));
    setDeleteId(null);
  };

  const filtered = posts
    .filter((p) => filterStatus === "all" || p.status === filterStatus)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase())),
    )
    .sort((a, b) => new Date(b[sortBy]) - new Date(a[sortBy]));

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-inter font-bold text-2xl m-0 mb-1" style={{ color: t.textPrimary }}>
            Blog Posts
          </h1>
          <p className="font-mono text-sm m-0" style={{ color: t.textSecondary }}>
            {counts.all} post{counts.all !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/blog/new")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-semibold text-white border-none transition-all duration-200"
          style={{
            background: "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)",
            boxShadow: "0 4px 16px rgba(29,94,255,0.25)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          New Post
        </button>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Status tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl"
          style={{ background: t.tabBg, border: `1px solid ${t.border}` }}
        >
          {["all", "published", "draft"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3 py-1.5 rounded-lg font-mono text-xs font-semibold capitalize transition-all duration-200 border-none"
              style={{
                background: filterStatus === s ? t.tabActiveBg : "transparent",
                color: filterStatus === s ? t.tabActiveColor : t.textSecondary,
                cursor: "pointer",
              }}
            >
              {s} ({counts[s]})
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-50"
          style={{ background: t.tabBg, border: `1px solid ${t.border}` }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10zM13 13l-2.5-2.5" stroke="#657688" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts or tags..."
            className="flex-1 border-none outline-none font-mono text-sm"
            style={{ background: "transparent", color: t.textPrimary }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="border-none bg-transparent cursor-pointer transition-colors"
              style={{ color: t.textSecondary }}
              onMouseEnter={(e) => (e.currentTarget.style.color = t.textPrimary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = t.textSecondary)}
            >
              ×
            </button>
          )}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-xl font-mono text-xs border-none outline-none"
          style={{ background: t.tabBg, border: `1px solid ${t.border}`, color: t.textSecondary, cursor: "pointer" }}
        >
          <option value="updatedAt">Last Updated</option>
          <option value="createdAt">Date Created</option>
          <option value="publishedAt">Published</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", background: t.cardBg }}>
          {/* Skeleton header */}
          <div
            className="grid font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-6 py-3"
            style={{
              gridTemplateColumns: "1fr 100px 120px 120px 100px",
              borderBottom: `1px solid ${t.border}`,
              background: t.tableHeadBg,
              color: t.textMuted,
            }}
          >
            <span>Title</span>
            <span>Status</span>
            <span>Tags</span>
            <span>Updated</span>
            <span className="text-right">Actions</span>
          </div>
          {/* Skeleton rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid items-center px-6 py-4 animate-pulse"
              style={{
                gridTemplateColumns: "1fr 100px 120px 120px 100px",
                borderBottom: i < 4 ? `1px solid ${t.borderLight}` : "none",
              }}
            >
              {/* Title + excerpt */}
              <div className="flex flex-col gap-2 pr-4">
                <div className="h-3.5 rounded-md" style={{ background: t.skeletonBg, width: `${60 + (i % 3) * 15}%` }} />
                <div className="h-2.5 rounded-md" style={{ background: t.skeletonBg2, width: `${35 + (i % 4) * 10}%` }} />
              </div>
              {/* Status pill */}
              <div className="h-5 rounded-full" style={{ background: t.skeletonBg, width: 64 }} />
              {/* Tags */}
              <div className="flex gap-1.5">
                <div className="h-5 rounded-md" style={{ background: t.skeletonBg, width: 44 }} />
                <div className="h-5 rounded-md" style={{ background: t.skeletonBg2, width: 36 }} />
              </div>
              {/* Date */}
              <div className="h-3 rounded-md" style={{ background: t.skeletonBg, width: 72 }} />
              {/* Actions */}
              <div className="flex justify-end gap-2">
                <div className="h-7 w-7 rounded-lg" style={{ background: t.skeletonBg }} />
                <div className="h-7 w-7 rounded-lg" style={{ background: t.skeletonBg2 }} />
              </div>
            </div>
          ))}
        </div>
      ) : fetchError ? (
        <div
          className="text-center py-24"
          style={{ border: `1px dashed rgba(238,14,14,0.25)`, borderRadius: 16, background: t.cardBg }}
        >
          <div className="text-3xl mb-4">⚠️</div>
          <p className="font-inter font-semibold mb-2" style={{ color: t.textPrimary }}>Failed to load posts</p>
          <p className="font-mono text-sm mb-6" style={{ color: t.textSecondary }}>{fetchError}</p>
          <button
            onClick={() => { setLoading(true); setFetchError(null); getAllPostsAdmin().then((data) => setPosts(data.posts ?? [])).catch((err) => setFetchError(err.message || "Failed to load posts")).finally(() => setLoading(false)); }}
            className="px-5 py-2.5 rounded-xl font-mono text-sm font-semibold text-white border-none"
            style={{ background: "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)", cursor: "pointer" }}
          >
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="text-center py-24"
          style={{ border: `1px dashed ${t.border}`, borderRadius: 16, background: t.cardBg }}
        >
          <div className="text-4xl mb-4">📝</div>
          <p className="font-inter font-semibold mb-2" style={{ color: t.textPrimary }}>
            {search || filterStatus !== "all" ? "No posts match your filters" : "No posts yet"}
          </p>
          <p className="font-mono text-sm mb-6" style={{ color: t.textSecondary }}>
            {search || filterStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first blog post to get started"}
          </p>
          {!search && filterStatus === "all" && (
            <button
              onClick={() => router.push("/admin/blog/new")}
              className="px-5 py-2.5 rounded-xl font-mono text-sm font-semibold text-white border-none"
              style={{ background: "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)", cursor: "pointer" }}
            >
              Create First Post
            </button>
          )}
        </div>
      ) : (
        <div style={{ border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", background: t.cardBg }}>
          {/* Table head */}
          <div
            className="grid font-mono text-[10px] font-bold tracking-[0.12em] uppercase px-6 py-3"
            style={{
              gridTemplateColumns: "1fr 100px 120px 120px 100px",
              borderBottom: `1px solid ${t.border}`,
              background: t.tableHeadBg,
              color: t.textMuted,
            }}
          >
            <span>Title</span>
            <span>Status</span>
            <span>Tags</span>
            <span>Updated</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Rows */}
          {filtered.map((post, i) => (
            <div
              key={post._id}
              className="grid items-center px-6 py-4 transition-colors duration-150"
              style={{
                gridTemplateColumns: "1fr 100px 120px 120px 100px",
                borderBottom: i < filtered.length - 1 ? `1px solid ${t.borderLight}` : "none",
                background: "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = t.rowHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="min-w-0 pr-4">
                <p className="font-inter font-semibold text-sm m-0 truncate" style={{ color: t.textPrimary }}>
                  {post.title || "Untitled"}
                </p>
                <p className="font-mono text-[11px] m-0 truncate mt-0.5" style={{ color: t.textMuted }}>
                  /{post.slug || "no-slug"}
                </p>
              </div>
              <div><StatusBadge status={post.status} /></div>
              <div className="flex flex-wrap gap-1">
                {(post.tags || []).slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(29,94,255,0.08)", color: "#1D5EFF" }}
                  >
                    {tag}
                  </span>
                ))}
                {(post.tags || []).length > 2 && (
                  <span className="font-mono text-[10px]" style={{ color: t.textMuted }}>
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
              <span className="font-mono text-xs" style={{ color: t.textSecondary }}>{fmtDate(post.updatedAt)}</span>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => router.push(`/admin/blog/edit/${post._id}`)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border-none transition-all duration-200"
                  style={{ background: t.actionBtnBg, color: t.textSecondary, cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(29,94,255,0.1)"; e.currentTarget.style.color = "#1D5EFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = t.actionBtnBg; e.currentTarget.style.color = t.textSecondary; }}
                  title="Edit"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 10l7.5-7.5 2 2L4 12H2v-2zM9.5 2.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteId(post._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border-none transition-all duration-200"
                  style={{ background: t.actionBtnBg, color: t.textSecondary, cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(238,14,14,0.08)"; e.currentTarget.style.color = "#EE0E0E"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = t.actionBtnBg; e.currentTarget.style.color = t.textSecondary; }}
                  title="Delete"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 3.5h10M5 3.5V2h4v1.5M5.5 6v4.5M8.5 6v4.5M3 3.5l.7 8h6.6l.7-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div
          className="fixed inset-0 flex items-center justify-center z-9999 px-4"
          style={{ background: t.modalOverlay, backdropFilter: "blur(6px)" }}
          onClick={() => setDeleteId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: t.modalBg,
              border: "1px solid rgba(238,14,14,0.15)",
              borderRadius: 20,
              padding: "32px",
              maxWidth: 400,
              width: "100%",
              boxShadow: t.modalShadow,
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(238,14,14,0.08)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#EE0E0E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-inter font-bold text-center text-lg mb-2" style={{ color: t.textPrimary }}>
              Delete Post?
            </h3>
            <p className="font-mono text-sm text-center mb-6" style={{ color: t.textSecondary }}>
              This action cannot be undone. The post will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl font-mono text-sm font-semibold border-none transition-colors duration-200"
                style={{ background: t.btnSecondaryBg, color: t.textSecondary, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.textSecondary)}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl font-mono text-sm font-bold text-white border-none transition-all duration-200"
                style={{ background: "#EE0E0E", cursor: "pointer", boxShadow: "0 4px 16px rgba(238,14,14,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#cc0b0b")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#EE0E0E")}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
