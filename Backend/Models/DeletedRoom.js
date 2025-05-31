const mongoose = require("mongoose");

const deletedRoomSchema = new mongoose.Schema({
  roomId: String,
  users: [{ id: String, name: String }],
  createdAt: Date,
  lastActivityAt: Date,
  deletedAt: Date,
  creatorId: String,
});

module.exports = mongoose.model(
  "DeletedRoom",
  deletedRoomSchema,
  "deleted_rooms"
);
