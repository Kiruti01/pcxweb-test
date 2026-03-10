import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const post = await Post.findOne({ slug, status: "published" }).populate(
      "author",
      "name email",
    );
    if (!post)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
