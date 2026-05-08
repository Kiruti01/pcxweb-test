import { Suspense } from "react";
import BlogList from "@/components/admin/BlogList";

export const metadata = { title: "Blog Posts | PCX Admin" };

export default function AdminBlogPage() {
  return (
    <Suspense>
      <BlogList />
    </Suspense>
  );
}
