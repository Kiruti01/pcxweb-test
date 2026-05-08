"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  getPostByIdAdmin,
  createPost,
  updatePost,
  slugify,
} from "@/lib/blogApi";
import { useAdminTheme } from "./adminTokens";

// ─── Cloudinary upload ────────────────────────────────────────────────────────
async function uploadToCloudinary(blob) {
  const formData = new FormData();
  formData.append("file", blob);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  );
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );
  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  return data.secure_url;
}

// ─── Canvas crop → blob ───────────────────────────────────────────────────────
function getCroppedBlob(image, crop) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("No canvas context"));
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Canvas toBlob failed"));
        resolve(blob);
      },
      "image/jpeg",
      0.92,
    );
  });
}

// ─── Single crop modal ────────────────────────────────────────────────────────
function CropModal({ src, aspect, title, onConfirm, onCancel, onSkip, uploading }) {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const { t } = useAdminTheme();

  const onImageLoad = useCallback(
    (e) => {
      const { width, height } = e.currentTarget;
      const initial = centerCrop(
        makeAspectCrop(
          { unit: "%", width: 80 },
          aspect || undefined,
          width,
          height,
        ),
        width,
        height,
      );
      setCrop(initial);
      setCompletedCrop(initial);
    },
    [aspect],
  );

  const handleConfirm = async () => {
    if (!completedCrop || !imgRef.current) return;
    const blob = await getCroppedBlob(imgRef.current, completedCrop);
    onConfirm(blob);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
    >
      <div
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: t.modalBg,
          border: `1px solid ${t.dropdownBorder}`,
          maxWidth: "90vw",
          maxHeight: "90vh",
          width: 680,
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: `1px solid ${t.border}` }}
        >
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: t.textSecondary }}>
              {title || "Crop Image"}
            </p>
            <p className="font-mono text-[10px] mt-0.5" style={{ color: t.textMuted }}>
              Drag to reposition · Drag corners to resize
            </p>
          </div>
          <button
            onClick={onCancel}
            className="w-7 h-7 rounded-lg flex items-center justify-center border-none font-bold text-sm"
            style={{ background: t.modalCloseBg, color: t.modalCloseColor, cursor: "pointer" }}
          >
            ×
          </button>
        </div>
        <div
          className="flex-1 overflow-auto flex items-center justify-center p-6"
          style={{ minHeight: 0 }}
        >
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            style={{ maxHeight: "60vh" }}
          >
            <img
              ref={imgRef}
              src={src}
              onLoad={onImageLoad}
              style={{ maxHeight: "60vh", maxWidth: "100%", display: "block" }}
              alt="Crop preview"
            />
          </ReactCrop>
        </div>
        <div
          className="flex items-center justify-end gap-3 px-5 py-4 flex-shrink-0"
          style={{ borderTop: `1px solid ${t.border}` }}
        >
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl font-mono text-sm border-none"
            style={{ background: t.btnSecondaryBg, color: t.btnSecondaryColor, cursor: "pointer" }}
          >
            Cancel
          </button>
          {onSkip && (
            <button
              onClick={onSkip}
              disabled={uploading}
              className="px-4 py-2 rounded-xl font-mono text-sm border-none"
              style={{ background: t.btnSecondaryBg, color: t.btnSecondaryColor, cursor: uploading ? "not-allowed" : "pointer" }}
            >
              Use Original
            </button>
          )}
          <button
            onClick={handleConfirm}
            disabled={uploading || !completedCrop?.width}
            className="px-5 py-2 rounded-xl font-mono text-sm font-bold text-white border-none flex items-center gap-2"
            style={{
              background: uploading
                ? "rgba(29,94,255,0.4)"
                : "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)",
              cursor: uploading ? "not-allowed" : "pointer",
              boxShadow: uploading ? "none" : "0 4px 14px rgba(29,94,255,0.3)",
            }}
          >
            {uploading && (
              <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            {uploading ? "Uploading…" : "Crop & Upload →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Grid picker modal ────────────────────────────────────────────────────────
// Two independent upload slots. Each slot: pick file → crop → preview thumbnail.
// Once both slots have a URL, "Insert Grid" becomes available.
function GridPickerModal({ onInsert, onCancel }) {
  const { t } = useAdminTheme();
  const [slots, setSlots] = useState([
    {
      src: null,
      url: null,
      uploading: false,
      cropSrc: null,
      crop: null,
      completedCrop: null,
    },
    {
      src: null,
      url: null,
      uploading: false,
      cropSrc: null,
      crop: null,
      completedCrop: null,
    },
  ]);
  const [activeCropSlot, setActiveCropSlot] = useState(null); // 0 | 1 | null
  const fileInput0 = useRef(null);
  const fileInput1 = useRef(null);
  const fileInputRefs = [fileInput0, fileInput1];

  const imgRef0 = useRef(null);
  const imgRef1 = useRef(null);
  const imgRefs = [imgRef0, imgRef1];
  const onImageLoad = useCallback((e, idx) => {
    const { width, height } = e.currentTarget;
    const initial = centerCrop(
      makeAspectCrop({ unit: "%", width: 80 }, 1, width, height),
      width,
      height,
    );
    setSlots((prev) =>
      prev.map((s, i) =>
        i === idx ? { ...s, crop: initial, completedCrop: initial } : s,
      ),
    );
  }, []);

  const handleFileChange = (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSlots((prev) =>
        prev.map((s, i) =>
          i === idx ? { ...s, cropSrc: ev.target.result, url: null } : s,
        ),
      );
      setActiveCropSlot(idx);
    };
    reader.readAsDataURL(file);
  };

  const handleCropConfirm = async (idx) => {
    const slot = slots[idx];
    if (!slot.completedCrop || !imgRefs[idx].current) return;
    setSlots((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, uploading: true } : s)),
    );
    try {
      const blob = await getCroppedBlob(
        imgRefs[idx].current,
        slot.completedCrop,
      );
      const url = await uploadToCloudinary(blob);
      setSlots((prev) =>
        prev.map((s, i) =>
          i === idx
            ? { ...s, url, src: url, uploading: false, cropSrc: null }
            : s,
        ),
      );
      setActiveCropSlot(null);
    } catch {
      setSlots((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, uploading: false } : s)),
      );
    }
  };

  const bothReady = slots[0].url && slots[1].url;

  // If a slot is being cropped, show the crop UI fullscreen within the modal
  if (activeCropSlot !== null) {
    const idx = activeCropSlot;
    const slot = slots[idx];
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.85)" }}
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            background: t.modalBg,
            border: `1px solid ${t.dropdownBorder}`,
            maxWidth: "90vw",
            maxHeight: "90vh",
            width: 680,
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: `1px solid ${t.border}` }}
          >
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: t.textSecondary }}>
                Crop Image {idx + 1} of 2
              </p>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: t.textMuted }}>
                Drag to reposition · Drag corners to resize
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCropSlot(null);
                setSlots((prev) =>
                  prev.map((s, i) => (i === idx ? { ...s, cropSrc: null } : s)),
                );
              }}
              className="w-7 h-7 rounded-lg flex items-center justify-center border-none font-bold text-sm"
              style={{ background: t.modalCloseBg, color: t.modalCloseColor, cursor: "pointer" }}
            >
              ×
            </button>
          </div>
          <div
            className="flex-1 overflow-auto flex items-center justify-center p-6"
            style={{ minHeight: 0 }}
          >
            <ReactCrop
              crop={slot.crop}
              onChange={(c) =>
                setSlots((prev) =>
                  prev.map((s, i) => (i === idx ? { ...s, crop: c } : s)),
                )
              }
              onComplete={(c) =>
                setSlots((prev) =>
                  prev.map((s, i) =>
                    i === idx ? { ...s, completedCrop: c } : s,
                  ),
                )
              }
              aspect={1}
              style={{ maxHeight: "60vh" }}
            >
              <img
                ref={imgRefs[idx]}
                src={slot.cropSrc}
                onLoad={(e) => onImageLoad(e, idx)}
                style={{
                  maxHeight: "60vh",
                  maxWidth: "100%",
                  display: "block",
                }}
                alt="Crop preview"
              />
            </ReactCrop>
          </div>
          <div
            className="flex items-center justify-end gap-3 px-5 py-4 flex-shrink-0"
            style={{ borderTop: `1px solid ${t.border}` }}
          >
            <button
              onClick={() => {
                setActiveCropSlot(null);
                setSlots((prev) =>
                  prev.map((s, i) => (i === idx ? { ...s, cropSrc: null } : s)),
                );
              }}
              className="px-4 py-2 rounded-xl font-mono text-sm border-none"
              style={{ background: t.btnSecondaryBg, color: t.btnSecondaryColor, cursor: "pointer" }}
            >
              Back
            </button>
            <button
              onClick={() => handleCropConfirm(idx)}
              disabled={slot.uploading || !slot.completedCrop?.width}
              className="px-5 py-2 rounded-xl font-mono text-sm font-bold text-white border-none flex items-center gap-2"
              style={{
                background: slot.uploading
                  ? "rgba(29,94,255,0.4)"
                  : "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)",
                cursor: slot.uploading ? "not-allowed" : "pointer",
                boxShadow: slot.uploading
                  ? "none"
                  : "0 4px 14px rgba(29,94,255,0.3)",
              }}
            >
              {slot.uploading && (
                <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
              )}
              {slot.uploading ? "Uploading…" : "Crop & Upload →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main grid picker UI
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
    >
      <div
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: t.modalBg,
          border: `1px solid ${t.dropdownBorder}`,
          maxWidth: "90vw",
          width: 620,
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: `1px solid ${t.border}` }}
        >
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: t.textSecondary }}>
              Insert 2-Column Grid
            </p>
            <p className="font-mono text-[10px] mt-0.5" style={{ color: t.textMuted }}>
              Upload and crop each image independently
            </p>
          </div>
          <button
            onClick={onCancel}
            className="w-7 h-7 rounded-lg flex items-center justify-center border-none font-bold text-sm"
            style={{ background: t.modalCloseBg, color: t.modalCloseColor, cursor: "pointer" }}
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 p-5">
          {slots.map((slot, idx) => (
            <div key={idx}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#657688] mb-2">
                Image {idx + 1}
              </p>
              <input
                ref={fileInputRefs[idx]}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, idx)}
              />

              {slot.url ? (
                // Uploaded — show thumbnail with re-pick option
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    aspectRatio: "1",
                    background: t.inputBg,
                  }}
                >
                  <img
                    src={slot.url}
                    alt={`Grid ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSlots((prev) =>
                        prev.map((s, i) =>
                          i === idx ? { ...s, url: null, src: null } : s,
                        ),
                      );
                    }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center border-none font-bold text-xs"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                  <div
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md font-mono text-[9px] font-bold uppercase"
                    style={{
                      background: "rgba(16,185,129,0.9)",
                      color: "#fff",
                    }}
                  >
                    Ready
                  </div>
                </div>
              ) : (
                // Empty slot
                <button
                  type="button"
                  onClick={() => fileInputRefs[idx].current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-2 rounded-xl font-mono text-xs"
                  style={{
                    aspectRatio: "1",
                    background: "rgba(29,94,255,0.06)",
                    border: "1px dashed rgba(29,94,255,0.3)",
                    color: "#657688",
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(29,94,255,0.12)";
                    e.currentTarget.style.borderColor = "rgba(29,94,255,0.6)";
                    e.currentTarget.style.color = "#86A8FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(29,94,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(29,94,255,0.3)";
                    e.currentTarget.style.color = "#657688";
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="18"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="8"
                      cy="9"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 16l5-5 4 4 3-3 6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Click to upload</span>
                  <span style={{ color: "#94A3B8" }}>Crop will follow</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Preview of how the grid will look */}
        {bothReady && (
          <div className="px-5 pb-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#657688] mb-2">
              Preview
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {slots.map((s, i) => (
                <img
                  key={i}
                  src={s.url}
                  alt=""
                  className="w-full rounded-lg object-cover"
                  style={{ aspectRatio: "1" }}
                />
              ))}
            </div>
          </div>
        )}

        <div
          className="flex items-center justify-end gap-3 px-5 py-4 flex-shrink-0"
          style={{ borderTop: `1px solid ${t.border}` }}
        >
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl font-mono text-sm border-none"
            style={{
              background: t.btnSecondaryBg,
              color: t.btnSecondaryColor,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onInsert(slots[0].url, slots[1].url)}
            disabled={!bothReady}
            className="px-5 py-2 rounded-xl font-mono text-sm font-bold text-white border-none flex items-center gap-2"
            style={{
              background: bothReady
                ? "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)"
                : "rgba(29,94,255,0.2)",
              cursor: bothReady ? "pointer" : "not-allowed",
              boxShadow: bothReady ? "0 4px 14px rgba(29,94,255,0.3)" : "none",
              color: bothReady ? "#fff" : "#657688",
            }}
          >
            Insert Grid →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
const renderMarkdown = (md = "", headingColor = "#13161A", textColor = "#2A3239") => {
  const hStyle = `color:${headingColor};-webkit-text-fill-color:${headingColor};background:none`;
  const tStyle = `color:${textColor}`;
  return md
    .replace(/^#{3} (.+)$/gm, `<h3 style="${hStyle}">$1</h3>`)
    .replace(/^#{2} (.+)$/gm, `<h2 style="${hStyle}">$1</h2>`)
    .replace(/^# (.+)$/gm, `<h1 style="${hStyle}">$1</h1>`)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="${hStyle}">$1</strong>`)
    .replace(/\*(.+?)\*/g, `<em style="${tStyle}">$1</em>`)
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
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .split("\n")
    .map((l) => (l.trim() && !l.startsWith("<") ? `<p>${l}</p>` : l))
    .join("\n");
};

// ─── Shared UI ────────────────────────────────────────────────────────────────
const ToolbarBtn = ({ title, onClick, children }) => {
  const { t } = useAdminTheme();
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-lg border-none font-mono text-xs font-bold transition-all duration-150"
      style={{ background: t.toolbarBtnBg, color: t.toolbarBtnColor, cursor: "pointer" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = t.toolbarBtnHoverBg;
        e.currentTarget.style.color = "#1D5EFF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = t.toolbarBtnBg;
        e.currentTarget.style.color = t.toolbarBtnColor;
      }}
    >
      {children}
    </button>
  );
};

const FieldLabel = ({ children, required }) => (
  <label className="block font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-[#657688] mb-1.5">
    {children}
    {required && <span className="text-[#EE0E0E] ml-0.5">*</span>}
  </label>
);

const Input = ({ value, onChange, placeholder, type = "text", ...props }) => {
  const { t } = useAdminTheme();
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full font-mono text-sm outline-none border-none rounded-lg px-3 py-2.5"
      style={{
        background: t.inputBg,
        border: `1px solid ${t.inputBorder}`,
        color: t.textPrimary,
        transition: "border-color 0.18s",
        boxSizing: "border-box",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#1D5EFF")}
      onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
      {...props}
    />
  );
};

// ─── Constants ────────────────────────────────────────────────────────────────
const EMPTY_POST = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  content: "",
  tags: [],
  category: "",
  status: "draft",
  featured: false,
  seoTitle: "",
  seoDesc: "",
};
const CATEGORIES = [
  "News",
  "Product",
  "Engineering",
  "Finance",
  "Payments",
  "Regulation",
  "Company",
];

// ─── Main component ───────────────────────────────────────────────────────────
const BlogEditor = ({ postId }) => {
  const router = useRouter();
  const { t } = useAdminTheme();
  const isNew = !postId;
  const editorRef = useRef(null);
  const coverInputRef = useRef(null);
  const singleImgInputRef = useRef(null);
  const insertMenuRef = useRef(null);

  const [post, setPost] = useState(EMPTY_POST);
  const [mode, setMode] = useState("split");
  const [tagInput, setTagInput] = useState("");
  const [saveState, setSaveState] = useState(null);
  const [autoSlug, setAutoSlug] = useState(true);
  const [seoOpen, setSeoOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(!isNew);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [showGridModal, setShowGridModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Single image crop modal
  const [cropModal, setCropModal] = useState(null);
  const [cropUploading, setCropUploading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };
  const pendingFilesRef = useRef([]);
  const savedCursorRef = useRef(0);

  useEffect(() => {
    if (!isNew) {
      getPostByIdAdmin(postId)
        .then((data) => {
          setPost({ ...EMPTY_POST, ...data.post });
          setAutoSlug(false);
        })
        .catch(() => router.push("/admin/blog"))
        .finally(() => setLoading(false));
    }
  }, [postId]);

  useEffect(() => {
    setWordCount(
      (post.content || "").trim().split(/\s+/).filter(Boolean).length,
    );
  }, [post.content]);

  useEffect(() => {
    const handler = (e) => {
      if (insertMenuRef.current && !insertMenuRef.current.contains(e.target)) {
        setShowInsertMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const set = (field) => (e) => {
    const val = e.target ? e.target.value : e;
    setIsDirty(true);
    setPost((prev) => {
      const next = { ...prev, [field]: val };
      if (field === "title" && autoSlug) next.slug = slugify(val);
      return next;
    });
  };

  const saveCursor = () => {
    const el = editorRef.current;
    if (el) savedCursorRef.current = el.selectionStart;
  };

  const insertAtPos = (pos, text) => {
    setIsDirty(true);
    setPost((p) => ({
      ...p,
      content: p.content.slice(0, pos) + text + p.content.slice(pos),
    }));
    requestAnimationFrame(() => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      const newPos = pos + text.length;
      el.setSelectionRange(newPos, newPos);
    });
  };

  const insertAt = (before, after = "") => {
    const el = editorRef.current;
    if (!el) return;
    const s = el.selectionStart,
      e2 = el.selectionEnd;
    const sel = post.content.slice(s, e2);
    const val =
      post.content.slice(0, s) + before + sel + after + post.content.slice(e2);
    setPost((p) => ({ ...p, content: val }));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  };

  const openCrop = (file, aspect, title, onConfirm) => {
    const reader = new FileReader();
    reader.onload = (e) =>
      setCropModal({ src: e.target.result, aspect, title, onConfirm, file });
    reader.readAsDataURL(file);
  };

  // ── Cover upload ──────────────────────────────────────────────────────────────
  const handleCoverFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    openCrop(file, undefined, "Crop Cover Image", async (blob) => {
      setCropUploading(true);
      try {
        const url = await uploadToCloudinary(blob);
        setIsDirty(true);
        setPost((p) => ({ ...p, coverImage: url }));
        setCropModal(null);
      } catch (err) {
        showToast("Cover upload failed: " + err.message);
      } finally {
        setCropUploading(false);
      }
    });
  };

  // ── Single body images ────────────────────────────────────────────────────────
  const processSingleFiles = () => {
    const files = pendingFilesRef.current;
    if (!files.length) return;
    const file = files[0];
    const cursorPos = savedCursorRef.current;
    openCrop(file, undefined, "Insert Image", async (blob) => {
      setCropUploading(true);
      try {
        const url = await uploadToCloudinary(blob);
        const alt = file.name.replace(/\.[^/.]+$/, "");
        insertAtPos(cursorPos, `\n![${alt}](${url})\n`);
        pendingFilesRef.current = pendingFilesRef.current.slice(1);
        setCropModal(null);
        setTimeout(() => processSingleFiles(), 100);
      } catch (err) {
        showToast("Upload failed: " + err.message);
        pendingFilesRef.current = [];
      } finally {
        setCropUploading(false);
      }
    });
  };

  const handleSingleImgChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    e.target.value = "";
    setShowInsertMenu(false);
    pendingFilesRef.current = files;
    processSingleFiles();
  };

  // ── Grid insert (called from GridPickerModal) ─────────────────────────────────
  const handleGridInsert = (url1, url2) => {
    const gridHtml = `\n<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0;"><img src="${url1}" style="width:100%;border-radius:8px;object-fit:cover;" /><img src="${url2}" style="width:100%;border-radius:8px;object-fit:cover;" /></div>\n`;
    insertAtPos(savedCursorRef.current, gridHtml);
    setShowGridModal(false);
  };
  // ── Bullet list ───────────────────────────────────────────────────────────────
  const insertBulletList = () => {
    const el = editorRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const e2 = el.selectionEnd;
    const sel = post.content.slice(s, e2);
    let result;
    if (sel.trim()) {
      result = sel
        .split("\n")
        .map((line) => (line.trim() ? `- ${line}` : line))
        .join("\n");
    } else {
      result = "- ";
    }
    const newContent =
      post.content.slice(0, s) + "\n" + result + "\n" + post.content.slice(e2);
    setPost((p) => ({ ...p, content: newContent }));
    requestAnimationFrame(() => {
      el.focus();
      const newPos = s + 1 + result.length;
      el.setSelectionRange(newPos, newPos);
    });
  };

  // ── Tags ──────────────────────────────────────────────────────────────────────
  const addTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase().replace(/,/g, "");
      if (!post.tags.includes(tag)) {
        setIsDirty(true);
        setPost((p) => ({ ...p, tags: [...p.tags, tag] }));
      }
      setTagInput("");
    }
  };
  const removeTag = (tag) => {
    setIsDirty(true);
    setPost((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  };

  // ── Save ──────────────────────────────────────────────────────────────────────
  const handleSave = async (status) => {
    if (!post.title.trim()) return showToast("Please add a title before saving");
    if (!post.slug.trim()) return showToast("Please add a slug before saving");
    if (!post.content.trim()) return showToast("Post content cannot be empty");
    setSaveState("saving");

    try {
      const payload = {
        ...post,
        status,
        readTime: Math.max(1, Math.round(wordCount / 200)),
      };
      if (isNew) await createPost(payload);
      else await updatePost(postId, payload);
      setSaveState("saved");
      setIsDirty(false);
      setTimeout(() => {
        router.push("/admin/blog?t=" + Date.now());
      }, 800);
    } catch (err) {
      showToast("Failed to save post. Please try again.");
      setSaveState(null);
    }
  };

  const readingTime = Math.max(1, Math.round(wordCount / 200));

  if (loading)
    return (
      <div className="flex flex-col gap-6 animate-pulse" style={{ maxHeight: "calc(100vh - 60px)" }}>
        {/* Top bar skeleton */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-4 w-12 rounded-md" style={{ background: t.skeletonBg }} />
            <div className="h-3 w-3 rounded-sm" style={{ background: t.skeletonBg2 }} />
            <div className="h-4 w-32 rounded-md" style={{ background: t.skeletonBg }} />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-28 rounded-lg" style={{ background: t.skeletonBg2 }} />
            <div className="h-8 w-24 rounded-xl" style={{ background: t.skeletonBg }} />
            <div className="h-8 w-24 rounded-xl" style={{ background: t.skeletonBg }} />
          </div>
        </div>

        {/* Two-column skeleton */}
        <div className="flex gap-6 flex-1 min-h-0">
          {/* Left sidebar */}
          <div className="flex flex-col gap-5 flex-shrink-0" style={{ width: 280 }}>
            <div className="h-10 rounded-xl" style={{ background: t.skeletonBg2 }} />
            <div className="h-10 rounded-xl" style={{ background: t.skeletonBg2 }} />
            {/* Field blocks */}
            {[56, 48, 72, 80, 48, 64].map((h, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="h-2.5 w-16 rounded-sm" style={{ background: t.skeletonBg2 }} />
                <div className="rounded-lg" style={{ height: h, background: t.skeletonBg }} />
              </div>
            ))}
          </div>

          {/* Editor area */}
          <div className="flex-1 rounded-2xl overflow-hidden" style={{ border: `1px solid ${t.border}` }}>
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: `1px solid ${t.border}`, background: t.toolbarBg }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-7 w-7 rounded-lg" style={{ background: t.skeletonBg2 }} />
              ))}
            </div>
            {/* Content area */}
            <div className="flex flex-col gap-4 p-6">
              {[80, 60, 90, 50, 75, 65, 85, 55].map((w, i) => (
                <div key={i} className="h-3.5 rounded-md" style={{ background: i % 3 === 0 ? t.skeletonBg : t.skeletonBg2, width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-9999 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg font-mono text-sm font-medium animate-fade-in"
          style={{
            background: toast.type === "error" ? "#2D1B1B" : "#1B2D1B",
            border: `1px solid ${toast.type === "error" ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.4)"}`,
            color: toast.type === "error" ? "#F87171" : "#4ADE80",
          }}
        >
          <span>{toast.type === "error" ? "✕" : "✓"}</span>
          {toast.message}
        </div>
      )}
      {showLeaveModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
          style={{ background: t.modalOverlay, backdropFilter: "blur(6px)" }}
          onClick={() => setShowLeaveModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: t.modalBg,
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 20,
              padding: "32px",
              maxWidth: 400,
              width: "100%",
              boxShadow: t.modalShadow,
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(245,158,11,0.1)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-inter font-bold text-center text-lg mb-2" style={{ color: t.textPrimary }}>
              Unsaved Changes
            </h3>
            <p className="font-mono text-sm text-center mb-6" style={{ color: t.textSecondary }}>
              You have unsaved changes. Leave without saving?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 py-2.5 rounded-xl font-mono text-sm font-semibold border-none transition-colors duration-200"
                style={{ background: t.btnSecondaryBg, color: t.textSecondary, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.textSecondary)}
              >
                Keep Editing
              </button>
              <button
                onClick={() => { setIsDirty(false); setShowLeaveModal(false); router.push("/admin/blog"); }}
                className="flex-1 py-2.5 rounded-xl font-mono text-sm font-bold text-white border-none"
                style={{ background: "#D97706", cursor: "pointer", boxShadow: "0 4px 16px rgba(217,119,6,0.3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b45309")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#D97706")}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {cropModal && (
        <CropModal
          src={cropModal.src}
          aspect={cropModal.aspect}
          title={cropModal.title}
          uploading={cropUploading}
          onConfirm={cropModal.onConfirm}
          onSkip={() => { cropModal.onConfirm(cropModal.file); setCropModal(null); }}
          onCancel={() => {
            setCropModal(null);
            pendingFilesRef.current = [];
          }}
        />
      )}

      {showGridModal && (
        <GridPickerModal
          onInsert={handleGridInsert}
          onCancel={() => setShowGridModal(false)}
        />
      )}

      <div>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverFileChange}
        />
        <input
          ref={singleImgInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSingleImgChange}
        />

        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => isDirty ? setShowLeaveModal(true) : router.push("/admin/blog")}
              className="flex items-center gap-1.5 font-mono text-sm border-none bg-transparent"
              style={{ color: t.textSecondary, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = t.textPrimary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = t.textSecondary)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Posts
            </button>
            <span style={{ color: t.breadcrumbSlash }}>/</span>
            <span className="font-inter font-semibold text-sm" style={{ color: t.textPrimary }}>
              {isNew ? "New Post" : post.title || "Edit Post"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {saveState === "saving" && (
              <span className="font-mono text-xs text-[#657688] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse inline-block" />
                Saving…
              </span>
            )}
            {saveState === "saved" && (
              <span className="font-mono text-xs text-[#10B981] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
                Saved
              </span>
            )}
            <div
              className="flex items-center gap-0.5 p-1 rounded-lg"
              style={{
                background: t.tabBg,
                border: `1px solid ${t.border}`,
              }}
            >
              {[
                { v: "write", label: "Write" },
                { v: "split", label: "Split" },
                { v: "preview", label: "Preview" },
              ].map(({ v, label }) => (
                <button
                  key={v}
                  onClick={() => setMode(v)}
                  className="px-3 py-1 rounded-md font-mono text-xs font-medium border-none transition-all duration-200"
                  style={{
                    background: mode === v ? t.modeActiveBg : "transparent",
                    color: mode === v ? t.modeActiveColor : t.textSecondary,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleSave("draft")}
              className="px-4 py-2 rounded-xl font-mono text-sm font-semibold border-none"
              style={{
                background: t.btnSecondaryBg,
                color: t.btnSecondaryColor,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = t.btnSecondaryHoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = t.btnSecondaryBg)}
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave("published")}
              className="px-4 py-2 rounded-xl font-mono text-sm font-bold text-white border-none"
              style={{
                background: "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)",
                boxShadow: "0 4px 14px rgba(29,94,255,0.3)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {post.status === "published" ? "Update" : "Publish"} →
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
          {/* LEFT */}
          <div className="flex flex-col gap-3" style={{ paddingRight: 4 }}>
            <div
              className="flex items-center gap-2 p-3 rounded-xl"
              style={{
                background: t.cardBg,
                border: `1px solid ${t.border}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background:
                    post.status === "published" ? "#10B981" : "#F59E0B",
                }}
              />
              <span
                className="font-mono text-xs font-bold uppercase tracking-widest"
                style={{
                  color: post.status === "published" ? "#10B981" : "#F59E0B",
                }}
              >
                {post.status}
              </span>
              <span className="font-mono text-xs ml-auto" style={{ color: t.textMuted }}>
                {wordCount} words · {readingTime} min read
              </span>
            </div>

            {/* Featured toggle */}
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: post.featured ? "rgba(29,94,255,0.06)" : t.cardBg,
                border: post.featured
                  ? "1px solid rgba(29,94,255,0.2)"
                  : `1px solid ${t.border}`,
                transition: "all 0.2s",
              }}
            >
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.78.67-3.93L1.3 5.14l3.94-.57L7 1z"
                    stroke={post.featured ? "#1D5EFF" : "#657688"}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={post.featured ? "rgba(29,94,255,0.3)" : "none"}
                  />
                </svg>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: post.featured ? "#1D5EFF" : "#657688" }}
                >
                  Featured
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsDirty(true);
                  setPost((p) => ({ ...p, featured: !p.featured }));
                }}
                className="relative border-none rounded-full"
                style={{
                  width: 36,
                  height: 20,
                  background: post.featured
                    ? "linear-gradient(87deg, #847AFF 0%, #086FFF 100%)"
                    : t.toggleOffBg,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <span
                  className="absolute rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    top: 3,
                    left: post.featured ? 19 : 3,
                    background: "#fff",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />
              </button>
            </div>

            <div>
              <FieldLabel required>Title</FieldLabel>
              <Input
                value={post.title}
                onChange={set("title")}
                placeholder="Post title…"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <FieldLabel required>Slug</FieldLabel>
                <button
                  onClick={() => setAutoSlug((v) => !v)}
                  className="font-mono text-[9px] uppercase tracking-widest border-none bg-transparent"
                  style={{
                    color: autoSlug ? "#1D5EFF" : t.textSecondary,
                    cursor: "pointer",
                  }}
                >
                  {autoSlug ? "auto ✓" : "auto"}
                </button>
              </div>
              <div
                className="flex items-center gap-1.5 rounded-lg px-3 py-2.5"
                style={{
                  background: t.inputBg,
                  border: `1px solid ${t.inputBorder}`,
                }}
              >
                <span className="font-mono text-xs shrink-0" style={{ color: t.slugPrefixColor }}>
                  /blog/
                </span>
                <input
                  value={post.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    set("slug")(e);
                  }}
                  placeholder="post-slug"
                  className="flex-1 border-none bg-transparent font-mono text-sm outline-none"
                  style={{ color: t.textPrimary }}
                />
              </div>
            </div>
            <div>
              <FieldLabel>Excerpt</FieldLabel>
              <textarea
                value={post.excerpt}
                onChange={set("excerpt")}
                placeholder="Short description…"
                rows={3}
                className="w-full font-mono text-sm outline-none rounded-lg px-3 py-2.5 resize-none"
                style={{
                  background: t.inputBg,
                  border: `1px solid ${t.inputBorder}`,
                  color: t.textPrimary,
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1D5EFF")}
                onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
              />
            </div>
            <div>
              <FieldLabel>Cover Image</FieldLabel>
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 font-mono text-sm border-none mb-2"
                style={{
                  background: "rgba(29,94,255,0.1)",
                  border: "1px dashed rgba(29,94,255,0.4)",
                  color: "#86A8FF",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(29,94,255,0.18)";
                  e.currentTarget.style.borderColor = "rgba(29,94,255,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(29,94,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(29,94,255,0.4)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1v8M3.5 4.5L7 1l3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 10.5V12a1 1 0 001 1h10a1 1 0 001-1v-1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Upload & crop cover
              </button>
              <Input
                value={post.coverImage}
                onChange={set("coverImage")}
                placeholder="…or paste image URL"
              />
              {post.coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden relative" style={{ maxHeight: 120 }}>
                  <img
                    src={post.coverImage}
                    alt="Cover"
                    className="w-full rounded-lg"
                    style={{ display: "block", height: 120, objectFit: "cover" }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <button
                    type="button"
                    onClick={() => setPost((p) => ({ ...p, coverImage: "" }))}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center border-none font-bold text-xs"
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <select
                value={post.category}
                onChange={set("category")}
                className="w-full font-mono text-sm outline-none rounded-lg px-3 py-2.5 border-none"
                style={{
                  background: t.inputBg,
                  border: `1px solid ${t.inputBorder}`,
                  color: post.category ? t.textPrimary : t.textSecondary,
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Tags</FieldLabel>
              <div
                className="rounded-lg px-3 py-2"
                style={{
                  background: t.inputBg,
                  border: `1px solid ${t.inputBorder}`,
                }}
              >
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(29,94,255,0.15)",
                        color: "#86A8FF",
                      }}
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="border-none bg-transparent text-[#86A8FF] cursor-pointer hover:text-white leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Add tag, press Enter…"
                  className="w-full border-none bg-transparent font-mono text-xs outline-none placeholder:text-[#94A3B8]"
                  style={{ color: t.textPrimary }}
                />
              </div>
            </div>
            <div
              style={{
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setSeoOpen((v) => !v)}
                className="flex items-center justify-between w-full px-4 py-3 border-none font-mono text-xs font-bold uppercase tracking-widest"
                style={{
                  background: t.seoHeaderBg,
                  color: t.textSecondary,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.textSecondary)}
              >
                SEO Settings
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    transform: seoOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {seoOpen && (
                <div
                  className="flex flex-col gap-4 p-4"
                  style={{ borderTop: `1px solid ${t.border}` }}
                >
                  <div>
                    <FieldLabel>SEO Title</FieldLabel>
                    <Input
                      value={post.seoTitle || ""}
                      onChange={set("seoTitle")}
                      placeholder="Defaults to post title"
                    />
                    <p className="font-mono text-[10px] mt-1" style={{ color: t.textMuted }}>
                      {(post.seoTitle || post.title).length}/60 chars
                    </p>
                  </div>
                  <div>
                    <FieldLabel>Meta Description</FieldLabel>
                    <textarea
                      value={post.seoDesc || ""}
                      onChange={set("seoDesc")}
                      placeholder="Defaults to excerpt…"
                      rows={3}
                      className="w-full font-mono text-sm outline-none rounded-lg px-3 py-2.5 resize-none"
                      style={{
                        background: t.inputBg,
                        border: `1px solid ${t.inputBorder}`,
                        color: t.textPrimary,
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1D5EFF")}
                      onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
                    />
                    <p className="font-mono text-[10px] mt-1" style={{ color: t.textMuted }}>
                      {(post.seoDesc || post.excerpt).length}/160 chars
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: editor + preview */}
          <div
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${t.editorOuterBorder}` }}
          >
            {mode !== "preview" && (
              <div
                className="flex items-center gap-1 px-4 py-2 flex-shrink-0 flex-wrap"
                style={{
                  borderBottom: `1px solid ${t.border}`,
                  background: t.toolbarBg,
                }}
              >
                <ToolbarBtn
                  title="Heading 2"
                  onClick={() => insertAt("\n## ", "\n")}
                >
                  H2
                </ToolbarBtn>
                <ToolbarBtn
                  title="Heading 3"
                  onClick={() => insertAt("\n### ", "\n")}
                >
                  H3
                </ToolbarBtn>
                <div className="w-px h-5 mx-1" style={{ background: t.toolbarDivider }} />
                <ToolbarBtn title="Bold" onClick={() => insertAt("**", "**")}>
                  <strong>B</strong>
                </ToolbarBtn>
                <ToolbarBtn title="Italic" onClick={() => insertAt("*", "*")}>
                  <em>I</em>
                </ToolbarBtn>
                <ToolbarBtn title="Code" onClick={() => insertAt("`", "`")}>
                  {"<>"}
                </ToolbarBtn>
                <div className="w-px h-5 mx-1" style={{ background: t.toolbarDivider }} />
                <ToolbarBtn
                  title="Blockquote"
                  onClick={() => insertAt("\n> ", "\n")}
                >
                  ❝
                </ToolbarBtn>
                <ToolbarBtn title="Bullet list" onClick={insertBulletList}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="2" cy="4" r="1.2" fill="currentColor" />
                    <circle cx="2" cy="8" r="1.2" fill="currentColor" />
                    <circle cx="2" cy="12" r="1.2" fill="currentColor" />
                    <path
                      d="M5 4h7M5 8h7M5 12h7"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </ToolbarBtn>
                <ToolbarBtn
                  title="Divider"
                  onClick={() => insertAt("\n\n---\n\n")}
                >
                  —
                </ToolbarBtn>
                <ToolbarBtn
                  title="Link"
                  onClick={() => insertAt("[", "](url)")}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5.5 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L6.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    <path d="M8.5 5.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </ToolbarBtn>
                <div className="w-px h-5 mx-1" style={{ background: t.toolbarDivider }} />

                {/* Image insert dropdown */}
                <div className="relative" ref={insertMenuRef}>
                  <button
                    type="button"
                    title="Insert image"
                    onClick={() => {
                      saveCursor();
                      setShowInsertMenu((v) => !v);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border-none font-mono text-xs font-bold transition-all duration-150"
                    style={{
                      background: showInsertMenu ? t.insertActiveBg : t.toolbarBtnBg,
                      color: showInsertMenu ? t.insertActiveColor : t.toolbarBtnColor,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.toolbarBtnHoverBg;
                      e.currentTarget.style.color = "#1D5EFF";
                    }}
                    onMouseLeave={(e) => {
                      if (!showInsertMenu) {
                        e.currentTarget.style.background = t.toolbarBtnBg;
                        e.currentTarget.style.color = t.toolbarBtnColor;
                      }
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect
                        x="1"
                        y="2"
                        width="12"
                        height="10"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <circle cx="4.5" cy="5.5" r="1" fill="currentColor" />
                      <path
                        d="M1 9.5l3-3 2.5 2.5 2-2 3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {showInsertMenu && (
                    <div
                      className="absolute rounded-xl overflow-hidden flex flex-col"
                      style={{
                        top: 36,
                        left: 0,
                        background: t.dropdownBg,
                        border: `1px solid ${t.dropdownBorder}`,
                        boxShadow: t.dropdownShadow,
                        minWidth: 190,
                        zIndex: 50,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setShowInsertMenu(false);
                          singleImgInputRef.current?.click();
                        }}
                        className="flex items-center gap-3 px-4 py-3 border-none text-left font-mono text-xs font-semibold transition-all"
                        style={{
                          background: "transparent",
                          color: t.dropdownItemColor,
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = t.dropdownItemHoverBg;
                          e.currentTarget.style.color = t.dropdownItemHoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = t.dropdownItemColor;
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <rect
                            x="1"
                            y="2"
                            width="12"
                            height="10"
                            rx="1.5"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <circle cx="4.5" cy="5.5" r="1" fill="currentColor" />
                          <path
                            d="M1 9.5l3-3 2.5 2.5 2-2 3.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Single image
                      </button>
                      <div
                        style={{
                          height: 1,
                          background: t.dropdownDivider,
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowInsertMenu(false);
                          setShowGridModal(true);
                        }}
                        className="flex items-center gap-3 px-4 py-3 border-none text-left font-mono text-xs font-semibold transition-all"
                        style={{
                          background: "transparent",
                          color: t.dropdownItemColor,
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = t.dropdownItemHoverBg;
                          e.currentTarget.style.color = t.dropdownItemHoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = t.dropdownItemColor;
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <rect
                            x="7.5"
                            y="1"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <rect
                            x="1"
                            y="7.5"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <rect
                            x="7.5"
                            y="7.5"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                        </svg>
                        2-column grid
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex" style={{ minHeight: 600 }}>
              {(mode === "write" || mode === "split") && (
                <textarea
                  ref={editorRef}
                  value={post.content}
                  onChange={set("content")}
                  onClick={saveCursor}
                  onKeyUp={saveCursor}
                  placeholder={
                    "Start writing in Markdown…\n\n# Heading\n\n**Bold** and *italic*\n\n> Blockquote\n\n- List item"
                  }
                  className="flex-1 font-mono text-sm outline-none resize-none p-6"
                  style={{
                    background: "transparent",
                    color: t.textPrimary,
                    lineHeight: 1.8,
                    borderRight: mode === "split" ? `1px solid ${t.editorSplitBorder}` : "none",
                    caretColor: "#1D5EFF",
                    minHeight: 600,
                  }}
                />
              )}
              {(mode === "preview" || mode === "split") && (
                <div
                  className="flex-1 p-8"
                  style={{
                    background: mode === "preview" ? "transparent" : t.previewPanelBg,
                  }}
                >
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt="Cover"
                      className="w-full rounded-xl mb-8"
                      style={{ display: "block" }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  {post.category && (
                    <span
                      className="inline-block font-mono text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                      style={{
                        background: "rgba(29,94,255,0.15)",
                        color: "#86A8FF",
                      }}
                    >
                      {post.category}
                    </span>
                  )}
                  <div
                    className="preview-body"
                    style={{ color: t.textPrimary }}
                    dangerouslySetInnerHTML={{
                      __html: post.title
                        ? `<h1 class="preview-h1" style="color:${t.textPrimary};-webkit-text-fill-color:${t.textPrimary};background:none">${post.title}</h1>${post.excerpt ? `<p class="preview-excerpt" style="color:${t.textSecondary}">${post.excerpt}</p>` : ""}${renderMarkdown(post.content, t.textPrimary, t.textPrimary)}`
                        : renderMarkdown(post.content, t.textPrimary, t.textPrimary) ||
                          `<p style="color:${t.textSecondary};font-style:italic">Nothing to preview yet…</p>`,
                    }}
                  />
                  {post.tags.length > 0 && (
                    <div
                      className="flex flex-wrap gap-2 mt-8 pt-6"
                      style={{ borderTop: `1px solid ${t.border}` }}
                    >
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: t.tagChipBg,
                            color: t.textSecondary,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogEditor;
