import React, { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar2";
import { nanoid } from 'nanoid';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

const JoinMeeting = () => {
    const [meetingLink, setMeetingLink] = useState("");
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [inputText, setInputText] = useState("");
    const [roomId, setRoomId] = useState("");
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Listen for room events
        socket.on('user-joined', ({ socketId }) => {
            console.log('User joined:', socketId);
            setParticipants(prev => [...prev, { socketId }]);
        });

        socket.on('user-left', ({ socketId }) => {
            console.log('User left:', socketId);
            setParticipants(prev => prev.filter(p => p.socketId !== socketId));
        });

        socket.on('room-participants', (participantsList) => {
            console.log('Current participants:', participantsList);
            setParticipants(participantsList);
        });

        socket.on('meeting-error', (errorMessage) => {
            setError(errorMessage);
            setTimeout(() => setError(""), 5000);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('user-joined');
            socket.off('user-left');
            socket.off('room-participants');
            socket.off('meeting-error');
        };
    }, []);

    const generateMeetingLink = () => {
        const newRoomId = nanoid(10);
        setRoomId(newRoomId);
        const link = `https://meet.example.com/${newRoomId}`;
        setMeetingLink(link);
        setPopupVisible(true);
        setTimeout(() => {
            setPopupVisible(false);
            setMeetingLink("");
        }, 600000); // Hide popup after 10 minutes

        // Create and join the room
        socket.emit('create-room', {
            roomId: newRoomId,
            socketId: socket.id
        });
    };

    const joinExistingMeeting = () => {
        if (inputText) {
            const roomIdFromLink = inputText.split('/').pop();
            setRoomId(roomIdFromLink);
            socket.emit('join-room', {
                roomId: roomIdFromLink,
                socketId: socket.id
            });
        }
    };

    return (
        <>
            <Navbar2 />
            <div className="bg-black text-white w-full h-screen flex items-center justify-center gap-4 p-4">
                <div className="w-1/2 p-4 ">
                    {error && (
                        <div className="text-red-500 mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <div className="text-left pl-4">
                        <div className="text-5xl font-thin">
                            Video calls and meetings for everyone
                        </div>
                        <div className="text-2xl font-thin mt-2">
                            Connect, collaborate, and celebrate from anywhere with Google Meet
                        </div>
                    </div>
                    <div className="pt-6 flex gap-4">
                        <button
                            onClick={generateMeetingLink}
                            className="bg-yellow-400 w-[30%] rounded-full p-3 text-black"
                        >
                            New Meeting
                        </button>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter Meeting Link"
                            className={`w-[30%] rounded-full p-3 text-white ${
                                inputText.length === 0 ? "border-white" : "border-yellow-400"
                            } bg-black border`}
                        />
                        <button 
                            onClick={joinExistingMeeting}
                            className="text-yellow-400 text-lg font-thin rounded-full p-3 font-semibold"
                        >
                            Join
                        </button>
                    </div>
                    {/* Display participants */}
                    {roomId && (
                        <div className="mt-4">
                            <div className="text-yellow-400 mb-2">
                                Participants in room: {participants.length}
                            </div>
                            <div className="text-sm">
                                {participants.map((p, index) => (
                                    <div key={p.socketId} className="text-gray-400">
                                        {p.socketId === socket.id ? 'You' : `Participant ${index + 1}`}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-1/2 text-center">
                    <img src="" alt="Meeting" className="inline-block" />
                </div>
            </div>

            {/* Popup */}
            {isPopupVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-[80%] max-w-md">
                        <p className="text-red-600 font-bold mb-2">
                            Warning: The link will expire in 10 minutes!
                        </p>
                        <div className="mb-4">
                            <p className="font-semibold">Your Meeting Link:</p>
                            <p className="bg-black text-white p-2 rounded">{meetingLink}</p>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(meetingLink)}
                            className="bg-yellow-400 text-black px-4 py-2 rounded-full"
                        >
                            Copy Link
                        </button>
                        <button
                            onClick={() => setPopupVisible(false)}
                            className="bg-gray-300 text-black px-4 py-2 rounded-full ml-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default JoinMeeting;