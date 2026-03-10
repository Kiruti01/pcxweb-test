import BlogEditor from "@/components/admin/BlogEditor";

export default async function EditPostPage({ params }) {
  const { id } = await params;
  return <BlogEditor postId={id} />;
}
