import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

function getToken(req) {
  return req.cookies.get("pcx_token")?.value;
}

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const post = await Post.findById(id).populate("author", "name email");
    if (!post)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    console.error("[posts/id/GET]", err.message, err.stack);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const token = getToken(req);
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    const body = await req.json();
    const post = await Post.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ post });
  } catch (err) {
    console.error("[posts/id/PUT]", err.message, err.stack);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const token = getToken(req);
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("[posts/id/DELETE]", err.message, err.stack);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
