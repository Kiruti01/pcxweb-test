import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlogPostView from "@/components/blog/BlogpostView";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getPost(slug) {
  try {
    await connectDB();
    const post = await Post.findOne({ slug, status: "published" }).lean();
    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch {
    return null;
  }
}

async function getRelated(category, currentId) {
  try {
    await connectDB();
    const posts = await Post.find({
      status: "published",
      _id: { $ne: currentId },
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelated(post.category, post._id);

  return (
    <>
      <Header />
      <main>
        <BlogPostView post={post} related={related} />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
