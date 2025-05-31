// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const fs = require("fs");
// const path = require("path");
// const socketIo = require("socket.io");
// const https = require("https");
// const { flushPendingUpdates } = require("./services/roomServices");

// const authRoutes = require("./Routes/authRoutes");
// const meetingRoutes = require("./Routes/meetingRoutes");
// const createMeeting = require("./Routes/meetingRoutes");

// // Load environment variables and connect to database
// dotenv.config();
// connectDB();

// // Initialize the app
// const app = express();
// setInterval(flushPendingUpdates, 30000);
// // Middleware
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.use(cookieParser());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/meeting", meetingRoutes);

// // HTTPS server setup
// const options = {
//   key: fs.readFileSync("letsencrypt/private.key"),
//   cert: fs.readFileSync("letsencrypt/certificate.crt"),
// };
// const server = https.createServer(options, app);
// const io = socketIo(server);

// // Initialize Socket.IO logic
// createMeeting(io);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server listening on https://localhost:${PORT}`);
// });



// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const { Server } = require("socket.io");
// const authRoutes = require("./Routes/authRoutes");
// const {
//   flushPendingUpdates,
//   addUserToRoom,
//   removeUserFromRoom,
//   createRoom,
// } = require("./services/roomServices");

// dotenv.config();
// connectDB();
// // Initialize the app
// const app = express();

// // Middleware setup
// app.use(cookieParser());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const io = new Server(server, {
//   cors: { origin: "*" },
// });
// // Route Handling
// app.use("/api/auth", authRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("create-room", async ({ roomId, userId }) => {
//     const created = await createRoom(roomId, userId);
//     socket.emit("room-created", { success: created });
//   });

//   socket.on("join-room", ({ roomId, user }) => {
//     addUserToRoom(roomId, user);
//     socket.join(roomId);
//     io.to(roomId).emit("user-joined", user);
//   });

//   socket.on("leave-room", ({ roomId, userId }) => {
//     removeUserFromRoom(roomId, userId);
//     socket.leave(roomId);
//     io.to(roomId).emit("user-left", userId);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// setInterval(flushPendingUpdates, 15000);

// server.listen(process.env.PORT || 5000, () => {
//   console.log("Server running on port", process.env.PORT || 5000);
// });



// ==== /server.js ====
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { addUserToRoom, removeUserFromRoom, getRooms, getRoomCreator, setRoomCreator } = require('./services/roomManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

// API route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Socket.IO handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId, user }) => {
    socket.join(roomId);
    addUserToRoom(roomId, { ...user, id: socket.id });
    const creator = getRoomCreator(roomId);
    if (!creator) {
      setRoomCreator(roomId, socket.id);
      socket.emit('room-creator', socket.id);
    } else {
      socket.emit('room-creator', creator);
    }
    socket.to(roomId).emit('user-joined', { id: socket.id, name: user.name });
    console.log(`${user.name} joined room ${roomId}`);
  });

  socket.on('leave-room', ({ roomId, userId }) => {
    removeUserFromRoom(roomId, userId);
    socket.to(roomId).emit('user-left', userId);
    console.log(`User ${userId} left room ${roomId}`);
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms].filter(r => r !== socket.id);
    rooms.forEach(roomId => {
      removeUserFromRoom(roomId, socket.id);
      socket.to(roomId).emit('user-left', socket.id);
      console.log(`User ${socket.id} disconnected and left room ${roomId}`);
    });
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));