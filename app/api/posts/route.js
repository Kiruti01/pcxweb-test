import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const query = status === "all" ? {} : { status: status || "published" };
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      posts,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("[posts/GET]", err.message, err.stack);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get("pcx_token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    const body = await req.json();
    const post = await Post.create({ ...body, author: decoded.id });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("[posts/POST]", err.message, err.stack);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
