const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  roomId: String,
  userId: String,
  joinedAt: Date,
  leftAt: Date,
  durationMs: Number,
});

module.exports = mongoose.model("UserSession", userSessionSchema);
