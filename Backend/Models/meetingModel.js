const mongoose = require("mongoose");
const Schema = mongoose.Schema; // For cleaner syntax

const meetingSchema = {
  // _id: String, // e.g., "meeting123" (MongoDB ObjectId as string)
  meeting_code: { type: String, required: true, unique: true }, // e.g., "abc-123-xyz"
  admin: { type: String, ref: "users", required: true }, // User who created the meeting
  co_admins: [{ type: String, ref: "users" }], // Array of co-admin user IDs
  participants: [
    {
      user_id: { type: String, ref: "users", required: true },
      joined_at: { type: Date, default: Date.now },
      left_at: { type: Date },
      totalTime:{type:Number}, // in seconds
    },
  ],
  settings: {
    enable_chat: { type: Boolean, default: true },
    enable_surveillance: { type: Boolean, default: false },
    
    // e.g., recording or monitoring
    // Add more settings as needed
  },
  title: { type: String },
  description: { type: String },
  start_time: { type: Date },
  end_time: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
};

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
