const { Server } = require("socket.io");

const userOnline = {};

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userOnline[userId] = socket.id;
      io.emit("user-list", Object.keys(userOnline));
    }

    socket.on("disconnect", () => {
      delete userOnline[userId];
      io.emit("user-list", Object.keys(userOnline));
    });

    socket.on("error", (err) => {
      console.error(`Socket error from ${userId}: ${err.message}`);
    });
  });
};

const getReceiverId = (id) => userOnline[id];

const emitMessage = (socketId, message) => {
  if (io && socketId) {
    io.to(socketId).emit("newMessage", message);
  }
};

module.exports = {
  initSocket,
  getReceiverId,
  emitMessage,
};
