const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { buffer } = require("stream/consumers");
const Schema = mongoose.Schema;

const userSchema = {
  // _id: String, // e.g., "user123" (MongoDB ObjectId as string),
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // password
  username: { type: String, required: true, unique: true },
  files: [
    {
      file_id: { type: String }, // Reference to GridFS file or filesystem path
      file_name: { type: String, required: true }, // e.g., "document.pdf"
      file_type: { type: String, required: true }, // e.g., "pdf", "docx", "jpg"
      file_size: { type: Number, required: true }, // Size in bytes
      meeting_id: { type: String }, // Optional: Links to meeting where it was shared
      uploaded_at: { type: Date, default: Date.now },
      saved: { type: Boolean, default: false }, // User can mark it as saved
    },
  ],
  storage_limit: { type: Number, default: 1048576*2 }, // 2 MB default
  storage_used: { type: Number, default: 0 }, // Tracks total file size
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  ProfileImage:{type:buffer}
};

const User = mongoose.model("User", userSchema);
module.exports = User;
