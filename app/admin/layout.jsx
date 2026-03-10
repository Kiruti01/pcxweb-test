"use client";

import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminLayout from "@/components/admin/AdminLayout";
import { getMe } from "@/lib/blogApi";

export default function AdminRootLayout({ children }) {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data.user);
        setAuthed(true);
      })
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#060e1f" }}
      >
        <div className="font-mono text-sm text-[#657688]">Loading...</div>
      </div>
    );

  if (!authed)
    return (
      <AdminLogin
        onLogin={(u) => {
          setUser(u);
          setAuthed(true);
        }}
      />
    );

  return (
    <AdminLayout
      onLogout={() => {
        setAuthed(false);
        setUser(null);
      }}
    >
      {children}
    </AdminLayout>
  );
}
