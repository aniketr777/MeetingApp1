const Meeting = require('../Models/meetingModel');
const express = require('express');
const router = express.Router();

// Add route to check meetings
router.get('/check-meetings', async (req, res) => {
    try {
        const meetings = await Meeting.find({});
        res.json(meetings);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).json({ error: 'Failed to fetch meetings' });
    }
});

const JoinMeeting = (io) => {
    // Store active rooms and their participants
    const rooms = new Map();

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('create-room', async ({ roomId }) => {
            try {
                // Create new meeting in database
                const meeting = new Meeting({
                    meeting_code: roomId,
                    admin: socket.id,
                    title: `Meeting ${roomId}`,
                    start_time: new Date(),
                    participants: [{
                        user_id: socket.id,
                        joined_at: new Date()
                    }]
                });

                await meeting.save();
                console.log(`Meeting created with ID: ${roomId} by admin: ${socket.id}`);
                
                // Join the socket to the room
                socket.join(roomId);
                
                // Initialize room if it doesn't exist
                if (!rooms.has(roomId)) {
                    rooms.set(roomId, new Set());
                }
                
                // Add user to room
                rooms.get(roomId).add(socket.id);
                
                // Notify others in the room
                socket.to(roomId).emit('user-joined', { socketId: socket.id });
                
                // Send current room participants to the new user
                const participants = Array.from(rooms.get(roomId)).map(id => ({ socketId: id }));
                socket.emit('room-participants', participants);
            } catch (error) {
                console.error('Error creating meeting:', error);
                socket.emit('meeting-error', 'Failed to create meeting');
            }
        });

        socket.on('join-room', async ({ roomId }) => {
            try {
                const meeting = await Meeting.findOne({ meeting_code: roomId });
                if (!meeting) {
                    socket.emit('meeting-error', 'Meeting not found');
                    return;
                }

                // Update meeting with new participant
                await Meeting.updateOne(
                    { meeting_code: roomId },
                    { 
                        $push: { 
                            participants: {
                                user_id: socket.id,
                                joined_at: new Date()
                            }
                        }
                    }
                );

                console.log(`User ${socket.id} joining room: ${roomId}`);
                
                // Join the socket to the room
                socket.join(roomId);
                
                // Initialize room if it doesn't exist
                if (!rooms.has(roomId)) {
                    rooms.set(roomId, new Set());
                }
                
                // Add user to room
                rooms.get(roomId).add(socket.id);
                
                // Notify others in the room
                socket.to(roomId).emit('user-joined', { socketId: socket.id });
                
                // Send current room participants to the new user
                const participants = Array.from(rooms.get(roomId)).map(id => ({ socketId: id }));
                socket.emit('room-participants', participants);

                // Handle disconnection
                socket.on('disconnect', async () => {
                    console.log(`User ${socket.id} disconnected from room ${roomId}`);
                    
                    // Update meeting to mark participant as left
                    await Meeting.updateOne(
                        { 
                            meeting_code: roomId,
                            'participants.user_id': socket.id,
                            'participants.left_at': null
                        },
                        { 
                            $set: { 
                                'participants.$.left_at': new Date(),
                                'participants.$.totalTime': new Date() - new Date(meeting.participants.find(p => p.user_id === socket.id).joined_at)
                            }
                        }
                    );

                    if (rooms.has(roomId)) {
                        rooms.get(roomId).delete(socket.id);
                        // If room is empty, delete it
                        if (rooms.get(roomId).size === 0) {
                            rooms.delete(roomId);
                            // Update meeting end time
                            await Meeting.updateOne(
                                { meeting_code: roomId },
                                { end_time: new Date() }
                            );
                        }
                        // Notify others that user left
                        socket.to(roomId).emit('user-left', { socketId: socket.id });
                    }
                });
            } catch (error) {
                console.error('Error joining meeting:', error);
                socket.emit('meeting-error', 'Failed to join meeting');
            }
        });

        // Handle signaling for WebRTC
        socket.on('signal', ({ to, signal }) => {
            io.to(to).emit('signal', {
                from: socket.id,
                signal
            });
        });
    });
};

module.exports = { JoinMeeting, router };
