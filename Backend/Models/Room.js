const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: String,
    users: [{ id: String, name: String }],
    createdAt: Date,
    lastActivityAt: Date,
    creatorId: String, // secure room creation
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActiveRoom", roomSchema, "active_rooms");
