const rooms = new Map();
const roomCreators = new Map();

exports.getRooms = () => Array.from(rooms.keys());

exports.addUserToRoom = (room, user) => {
  if (!rooms.has(room)) rooms.set(room, []);
  const users = rooms.get(room);
  if (!users.find((u) => u.id === user.id)) {
    users.push(user);
  }
};

exports.removeUserFromRoom = (room, userId) => {
  if (!rooms.has(room)) return;

  const users = rooms.get(room);
  const updatedUsers = users.filter((user) => user.id !== userId);

  if (updatedUsers.length === 0) {
    setTimeout(() => {
      rooms.delete(room);
      roomCreators.delete(room);
      console.log(`Meeting ${room} deleted due to inactivity.`);
    }, 1000 * 60 * 10); // Delete after 10 minutes of inactivity
  } else {
    rooms.set(room, updatedUsers);
  }
};

exports.getRoomCreator = (room) => roomCreators.get(room);
exports.setRoomCreator = (room, creatorId) => roomCreators.set(room, creatorId);
