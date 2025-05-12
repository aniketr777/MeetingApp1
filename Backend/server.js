const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
// const helmet = require("helmet"); // For securing HTTP headers
const connectDB = require("./config/db");
// Import Routes
const authRoutes = require("./Routes/authRoutes");
// const joinMeetRoutes = require('./routes/joinMeetRoutes');
// const createMeetRoutes = require('./routes/createMeetRoutes');

// Load environment variables
dotenv.config();
connectDB();
// Initialize the app
const app = express();

// Middleware setup
app.use(cookieParser());
// app.use(helmet()); // Secure HTTP headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Handling
app.use("/api/auth", authRoutes);
// app.use('/api/joinMeet', joinMeetRoutes);
// app.use('/api/createMeet', createMeetRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
