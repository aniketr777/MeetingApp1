// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { io } from "socket.io-client";

// const JoinPage = () => {
//   const [roomId, setRoomId] = useState("");
//   const navigate = useNavigate();

//   const joinRoom = () => {
//     if (roomId) {
//       const socket = io("https://localhost:443");
//       socket.emit("join-room", roomId, (success) => {
//         if (success) {
//           navigate(`/meeting/${roomId}`);
//         } else {
//           alert("Room not found!");
//         }
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4">Join a Meeting</h1>
//       <input
//         type="text"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         placeholder="Enter Room ID"
//         className="px-4 py-2 border rounded mb-4"
//       />
//       <button
//         onClick={joinRoom}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Join Meeting
//       </button>
//       <Link to="/" className="mt-4 text-blue-500 hover:underline">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default JoinPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId && userName) {
      navigate(`/room/${roomId}?name=${userName}`);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <input
        placeholder="Room ID"
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2"
      />
      <input
        placeholder="Your Name"
        onChange={(e) => setUserName(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={handleJoin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Join Meeting
      </button>
    </div>
  );
}