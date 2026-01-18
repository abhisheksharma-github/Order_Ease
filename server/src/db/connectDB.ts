import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI not found in environment variables");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
      dbName: 'test', // Optional: specify if not in URI
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
