import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import ControlPanel from "../Pages/ControlPanel";

const socket = io("http://localhost:5000");

export default function MeetingPage() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const videoRef = useRef();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("join-room", { roomId, user: { id: socket.id, name } });
    return () => {
      socket.emit("leave-room", { roomId, userId: socket.id });
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("user-joined", (user) => setUsers((prev) => [...prev, user]));
    socket.on("user-left", (id) =>
      setUsers((prev) => prev.filter((u) => u.id !== id))
    );
  }, []);

  return (
    <div className="p-4">
      <h2>Meeting ID: {roomId}</h2>
      <div className="flex flex-col gap-4 mt-4">
        <video ref={videoRef} autoPlay muted className="w-full h-64 bg-black" />
        <ControlPanel videoRef={videoRef} />
        <div>
          <h3>Participants</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
