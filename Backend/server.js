const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const http = require('http');
const socketio = require('socket.io');
// const helmet = require("helmet"); // For securing HTTP headers
const connectDB = require("./config/db");
// Import Routes
const authRoutes = require("./Routes/authRoutes");
const { JoinMeeting, router: meetingRoutes } = require("./Routes/joinMeetRoutes");
// const joinMeetRoutes = require('./routes/joinMeetRoutes');
// const createMeetRoutes = require('./routes/createMeetRoutes');

// Load environment variables
dotenv.config();
connectDB();
// Initialize the app
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware setup
app.use(cookieParser());
// app.use(helmet()); // Secure HTTP headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Handling
app.use("/api/auth", authRoutes);
app.use('/api/meetings', meetingRoutes);
// app.use('/api/joinMeet', joinMeetRoutes);
// app.use('/api/createMeet', createMeetRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

JoinMeeting(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
