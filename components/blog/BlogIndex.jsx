"use client";

import { useState } from "react";
import Link from "next/link";

const GRID_PER_PAGE = 6;

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const readingTime = (body = "") =>
  Math.max(
    1,
    Math.round(body.trim().split(/\s+/).filter(Boolean).length / 200),
  );

/* ── Cover image with gradient fallback ── */
const CoverImg = ({ src, alt, className, style }) =>
  src ? (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={(e) => {
        e.target.parentElement.style.background =
          "linear-gradient(135deg,rgba(132,122,255,0.14),rgba(29,94,255,0.08))";
        e.target.style.display = "none";
      }}
    />
  ) : (
    <div
      className={className}
      style={{
        ...style,
        background:
          "linear-gradient(135deg,rgba(132,122,255,0.14),rgba(29,94,255,0.08))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        opacity="0.22"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="#1D5EFF"
          strokeWidth="1.5"
        />
        <path
          d="M3 9h18M9 9v12"
          stroke="#1D5EFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

/* ── Read More — span only (lives inside card <Link> wrappers) ── */
const ReadMore = () => (
  <span
    className="inline-flex items-center font-mono text-sm font-semibold"
    style={{ color: "#1D5EFF", gap: "4px" }}
  >
    Read More
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/* ── Featured article ── */
const FeaturedCard = ({ post }) => (
  <div>
    <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#9AA5B4] mb-4">
      Featured Article
    </p>
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col md:flex-row gap-5 no-underline group"
      style={{ textDecoration: "none" }}
    >
      {/* Image — 16:9 aspect ratio on mobile, fixed height on desktop */}
      <div
        className="md:w-[42%] flex-shrink-0 rounded-xl overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <CoverImg
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ height: "100%", display: "block" }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1 md:justify-center md:py-2">
        {/* Title — smaller on mobile to match Figma */}
        <h2 className="font-inter text-[18px] md:text-[26px] font-bold leading-[1.3] text-[#13161A] m-0 transition-colors duration-200 group-hover:text-[#1D5EFF]">
          {post.title}
        </h2>

        {/* Excerpt — hidden on mobile if too long, shown on desktop */}
        {post.excerpt && (
          <p
            className="font-mono text-xs md:text-sm text-[#657688] leading-relaxed m-0"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Date · read time */}
        <p className="font-mono text-[11px] text-[#9AA5B4] m-0">
          {fmtDate(post.publishedAt || post.createdAt)} ·{" "}
          {readingTime(post.body)} min read
        </p>

        <ReadMore />
      </div>
    </Link>
  </div>
);

/* ── Grid card ── */
const GridCard = ({ post }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="flex flex-col no-underline group"
    style={{ textDecoration: "none" }}
  >
    <div className="rounded-xl overflow-hidden mb-4 flex-shrink-0">
      <CoverImg
        src={post.coverImage}
        alt={post.title}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ height: 156, display: "block" }}
      />
    </div>
    <h3 className="font-inter text-[15px] font-bold leading-[1.3] text-[#13161A] m-0 mb-2 transition-colors duration-200 group-hover:text-[#1D5EFF]">
      {post.title}
    </h3>
    {post.excerpt && (
      <p
        className="font-mono text-xs text-[#657688] leading-relaxed m-0 mb-3"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {post.excerpt}
      </p>
    )}
    <p className="font-mono text-[10px] text-[#9AA5B4] m-0 mb-3">
      {post.author?.name && <>{post.author.name} · </>}
      {fmtDate(post.publishedAt || post.createdAt)} · {readingTime(post.body)}{" "}
      min read
    </p>
    <ReadMore />
  </Link>
);

/* ── Pagination ── */
const Pagination = ({ page, total, perPage, onChange }) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div
      className="flex items-center justify-between pt-6 mt-6"
      style={{ borderTop: "1px solid rgba(29,94,255,0.07)" }}
    >
      {/* Page numbers — left */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className="w-8 h-8 flex items-center justify-center rounded-full font-mono text-xs font-bold border-none transition-all duration-200"
            style={{
              background: p === page ? "#1D5EFF" : "transparent",
              color: p === page ? "white" : "#657688",
              cursor: "pointer",
              boxShadow: p === page ? "0 4px 12px rgba(29,94,255,0.28)" : "none",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Prev / Next — right */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => page > 1 && onChange(page - 1)}
          disabled={page === 1}
          className="w-10 h-10 flex items-center justify-center rounded-full border-none transition-all duration-200"
          style={{
            background: "rgba(0,0,0,0.06)",
            color: page === 1 ? "#C0C8D4" : "#657688",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => page < totalPages && onChange(page + 1)}
          disabled={page === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-full border-none transition-all duration-200"
          style={{
            background: "#1D5EFF",
            color: "white",
            cursor: page === totalPages ? "not-allowed" : "pointer",
            opacity: page === totalPages ? 0.4 : 1,
            boxShadow: page < totalPages ? "0 4px 14px rgba(29,94,255,0.35)" : "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   BLOG INDEX — receives posts from the server component
   ═══════════════════════════════════════════════════════ */
export default function BlogIndex({ posts = [] }) {
  const [page, setPage] = useState(1);

  // Pick the featured post: prefer one explicitly flagged, fall back to latest
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = featured ? posts.filter((p) => p._id !== featured._id) : [];

  const gridSlice = rest.slice(
    (page - 1) * GRID_PER_PAGE,
    page * GRID_PER_PAGE,
  );
  const firstRow = gridSlice.slice(0, 3);
  const secondRow = gridSlice.slice(3, 6);

  return (
    <>
      {/* Hero */}
      <section className="text-center pt-14 md:pt-28 pb-10 md:pb-20 px-6 max-md:px-4">
        {/* Badge — blue pill matching other pages */}
        <div className="inline-flex items-center px-5 py-2 md:px-5 md:py-2 rounded-full border border-[rgba(29,94,255,0.3)] bg-[rgba(29,94,255,0.06)] mb-5 md:mb-7 transition-all duration-220 hover:bg-[rgba(29,94,255,0.1)] hover:border-[rgba(29,94,255,0.5)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(29,94,255,0.1)]">
          <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#1D5EFF] uppercase tracking-[0.12em]">
            Blog
          </span>
        </div>

        <h1 className="font-inter text-[32px] md:text-[64px] font-bold leading-[1.15] md:leading-[1.1] text-[#13161A] m-0 mb-4 md:mb-5 max-w-[280px] md:max-w-2xl mx-auto">
          Stories & Insights on Global Finance
        </h1>

        <p className="font-mono text-[13px] md:text-[15px] text-[#657688] max-w-[260px] md:max-w-[440px] mx-auto m-0 leading-relaxed">
          Read the latest stories on cross-border payments, fintech innovation,
          and the trends shaping how businesses move money around the world.
        </p>
      </section>

      {/* Posts card */}
      <div className="max-w-5xl mx-auto px-6 pb-28 max-md:px-4">
        {posts.length === 0 ? (
          <div
            className="text-center py-24 bg-white rounded-3xl"
            style={{ border: "1px solid rgba(29,94,255,0.08)" }}
          >
            <div className="text-5xl mb-4">📭</div>
            <h3 className="font-inter font-bold text-xl text-[#13161A] mb-2">
              No posts yet
            </h3>
            <p className="font-mono text-sm text-[#657688]">
              Check back soon — content is coming.
            </p>
          </div>
        ) : (
          <div
            className="bg-white rounded-3xl px-5 md:px-12 py-8 md:py-10"
            style={{
              boxShadow: "0 4px 48px rgba(29,94,255,0.06)",
              border: "1px solid rgba(29,94,255,0.06)",
            }}
          >
            {featured && <FeaturedCard post={featured} />}

            {gridSlice.length > 0 && (
              <div
                className="my-8"
                style={{ height: 1, background: "rgba(29,94,255,0.07)" }}
              />
            )}

            {gridSlice.length > 0 && (
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#9AA5B4] mb-6">
                Latest Articles
              </p>
            )}

            {firstRow.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {firstRow.map((p) => (
                  <GridCard key={p._id} post={p} />
                ))}
              </div>
            )}

            {secondRow.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {secondRow.map((p) => (
                  <GridCard key={p._id} post={p} />
                ))}
              </div>
            )}

            <Pagination
              page={page}
              total={rest.length}
              perPage={GRID_PER_PAGE}
              onChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
