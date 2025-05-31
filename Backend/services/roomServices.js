const ActiveRoom = require("../Models/Room");
const DeletedRoom = require("../Models/DeletedRoom");
const UserSession = require("../Models/UserSession");

const rooms = new Map();
const roomDeletionTimeouts = new Map();
const userSessions = new Map();
const pendingDbUpdates = [];

exports.createRoom = async (roomId, creatorId) => {
  if (rooms.has(roomId)) return false;
  rooms.set(roomId, []);
  await ActiveRoom.create({
    roomId,
    users: [],
    createdAt: new Date(),
    lastActivityAt: new Date(),
    creatorId,
  });
  return true;
};

exports.addUserToRoom = (roomId, user) => {
  if (!rooms.has(roomId)) return;

  const users = rooms.get(roomId);
  if (!users.find((u) => u.id === user.id)) {
    users.push(user);
  }

  const key = `${roomId}-${user.id}`;
  if (!userSessions.has(key)) {
    userSessions.set(key, {
      roomId,
      userId: user.id,
      joinedAt: new Date(),
    });
  }

  if (roomDeletionTimeouts.has(roomId)) {
    clearTimeout(roomDeletionTimeouts.get(roomId));
    roomDeletionTimeouts.delete(roomId);
  }
};

exports.removeUserFromRoom = (roomId, userId) => {
  if (!rooms.has(roomId)) return;

  const users = rooms.get(roomId);
  const updatedUsers = users.filter((u) => u.id !== userId);
  const key = `${roomId}-${userId}`;

  if (userSessions.has(key)) {
    const session = userSessions.get(key);
    session.leftAt = new Date();
    session.durationMs = session.leftAt - session.joinedAt;
    pendingDbUpdates.push({ type: "session", data: session });
    userSessions.delete(key);
  }

  if (updatedUsers.length === 0) {
    const timeout = setTimeout(async () => {
      const roomDoc = await ActiveRoom.findOne({ roomId });
      const roomData = {
        roomId,
        users,
        createdAt: roomDoc?.createdAt || new Date(),
        lastActivityAt: new Date(),
        deletedAt: new Date(),
        creatorId: roomDoc?.creatorId || "unknown",
      };

      pendingDbUpdates.push({ type: "room_delete", data: roomData });
      rooms.delete(roomId);
      roomDeletionTimeouts.delete(roomId);
    }, 1000 * 60 * 10);

    roomDeletionTimeouts.set(roomId, timeout);
  } else {
    rooms.set(roomId, updatedUsers);
  }
};

exports.flushPendingUpdates = async () => {
  if (pendingDbUpdates.length === 0) return;

  const updates = [...pendingDbUpdates];
  pendingDbUpdates.length = 0;

  const sessions = updates
    .filter((u) => u.type === "session")
    .map((u) => u.data);
  const deletions = updates
    .filter((u) => u.type === "room_delete")
    .map((u) => u.data);

  try {
    if (sessions.length > 0) await UserSession.insertMany(sessions);
    if (deletions.length > 0) {
      await DeletedRoom.insertMany(deletions);
      const ids = deletions.map((r) => r.roomId);
      await ActiveRoom.deleteMany({ roomId: { $in: ids } });
    }
  } catch (err) {
    console.error("Error during DB batch update:", err);
    pendingDbUpdates.push(...updates);
  }
};
