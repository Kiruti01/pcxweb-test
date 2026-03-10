import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlogIndex from "@/components/blog/BlogIndex";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export const revalidate = 60;

async function getPosts() {
  try {
    await connectDB();
    const posts = await Post.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Header />
      <main>
        <BlogIndex posts={posts} />
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
