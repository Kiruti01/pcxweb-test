"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const vp = { once: true, amount: 0.1 };

/* ── Markdown renderer ── */
const renderMarkdown = (md = "") =>
  md
    .replace(/^#{3} (.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2} (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, "<hr/>")
    .replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:12px 0;display:block;" />',
    )
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(/(^- .+$(\n^- .+$)*)/gm, (block) => {
      const items = block
        .split("\n")
        .map((line) => `<li>${line.replace(/^- /, "")}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    })
    .replace(/\n\n/g, "</p><p>")
    .split("\n")
    .map((l) => (l.trim() && !l.startsWith("<") ? `<p>${l}</p>` : l))
    .join("\n");

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

/* ── Sidebar story card ── */
const SidebarCard = ({ post }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="flex flex-col no-underline group"
    style={{ textDecoration: "none" }}
  >
    <div className="rounded-xl overflow-hidden mb-3" style={{ height: 140 }}>
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(e) => {
            e.target.parentElement.style.background =
              "linear-gradient(135deg,rgba(132,122,255,0.14),rgba(29,94,255,0.08))";
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg,rgba(132,122,255,0.14),rgba(29,94,255,0.08))",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            opacity="0.3"
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
      )}
    </div>
    <h4
      className="font-inter text-[14px] font-bold leading-snug m-0 mb-1.5 transition-colors duration-200 group-hover:text-[#1D5EFF]"
      style={{ color: "#13161A" }}
    >
      {post.title}
    </h4>
    {post.excerpt && (
      <p
        className="font-mono text-xs text-[#657688] leading-relaxed m-0 mb-2"
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
    <p className="font-mono text-[10px] text-[#9AA5B4] m-0 mb-2">
      {fmtDate(post.publishedAt || post.createdAt)}
    </p>
    <span
      className="inline-flex items-center gap-1 font-mono text-xs font-semibold"
      style={{ color: "#1D5EFF" }}
    >
      Read More
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </Link>
);

/* ═══════════════════════════════════════════════════════
   BLOG POST VIEW
   ═══════════════════════════════════════════════════════ */
export default function BlogPostView({ post, related = [] }) {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const html = renderMarkdown(post.content);

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 font-mono text-xs text-[#9AA5B4] mb-6">
          <Link
            href="/blog"
            className="transition-colors no-underline font-semibold"
            style={{ color: "#1D5EFF", textDecoration: "none" }}
          >
            Blogs
          </Link>
          <span className="text-[#9AA5B4]">/</span>
          <span className="text-[#657688] truncate max-w-[240px]">
            {post.title}
          </span>
        </nav>

        {/* Two-column layout */}
        <div className="flex gap-12 items-start">
          {/* ── MAIN ARTICLE ── */}
          <article className="flex-1 min-w-0">
            {/* Above-fold: title, meta, cover */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={fadeUp}
                className="font-inter text-[26px] md:text-[36px] font-bold leading-[1.2] text-[#13161A] m-0 mb-3"
              >
                {post.title}
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 font-mono text-xs text-[#9AA5B4] mb-7"
              >
                <span>{fmtDate(post.publishedAt || post.createdAt)}</span>
                <span className="text-[#C8D0DA]">|</span>
                <span>{readingTime(post.content)} mins. read</span>
              </motion.div>

              {post.coverImage && (
                <motion.div
                  variants={fadeUp}
                  className="mb-7 rounded-2xl overflow-hidden"
                  style={{ maxWidth: "100%" }}
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full"
                    style={{ display: "block", borderRadius: 16 }}
                    onError={(e) =>
                      (e.target.parentElement.style.display = "none")
                    }
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Body */}
            <motion.div
              className="blog-body"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Tags */}
            {(post.tags || []).length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="flex flex-wrap gap-2 mt-10 pt-8"
                style={{ borderTop: "1px solid rgba(29,94,255,0.08)" }}
              >
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(29,94,255,0.06)",
                      color: "#657688",
                      border: "1px solid rgba(29,94,255,0.1)",
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Share row */}
            {pageUrl && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="flex items-center gap-3 mt-8 pt-6 flex-wrap"
                style={{ borderTop: "1px solid rgba(29,94,255,0.08)" }}
              >
                <span className="font-mono text-xs text-[#9AA5B4] mr-1">
                  Share:
                </span>
                {[
                  {
                    label: "Twitter / X",
                    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`,
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs no-underline px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{
                      background: "rgba(29,94,255,0.06)",
                      color: "#657688",
                      border: "1px solid rgba(29,94,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(29,94,255,0.12)";
                      e.currentTarget.style.color = "#1D5EFF";
                      e.currentTarget.style.borderColor = "rgba(29,94,255,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(29,94,255,0.06)";
                      e.currentTarget.style.color = "#657688";
                      e.currentTarget.style.borderColor = "rgba(29,94,255,0.1)";
                    }}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </motion.div>
            )}
          </article>

          {/* ── SIDEBAR (desktop only) ── */}
          {related.length > 0 && (
            <motion.aside
              className="hidden lg:block flex-shrink-0"
              style={{ width: 300 }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 }}
            >
              <div className="sticky top-24">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#9AA5B4] mb-6">
                  Other Stories
                </h3>
                <div className="flex flex-col gap-8">
                  {related.map((p) => (
                    <SidebarCard key={p._id} post={p} />
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </div>

        {/* ── OTHER STORIES (mobile only) ── */}
        {related.length > 0 && (
          <motion.div
            className="lg:hidden mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(29,94,255,0.08)" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#9AA5B4] mb-5">
              Other Stories
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {related.map((p) => (
                <SidebarCard key={p._id} post={p} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
