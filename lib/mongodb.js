import mongoose from "mongoose";

let cached =
  global.mongoose || (global.mongoose = { conn: null, promise: null });

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) throw new Error("MONGODB_URI environment variable is not defined");

  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
