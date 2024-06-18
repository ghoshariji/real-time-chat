const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const db = require("./dbConn/dbConn");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const { initSocket } = require("./socket/socket");

const server = require("http").createServer(app);
initSocket(server)
// const io = require("socket.io")(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
// });

// const userOnline = {};
// const getReceiverId = (id) => {
//   return userOnline[id];
// };

// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;
//   if (userId) {
//     userOnline[userId] = socket.id;
//     io.emit("user-list", Object.keys(userOnline));
//   }
//   socket.on("disconnect", () => {
//     delete userOnline[userId];
//     io.emit("user-list", Object.keys(userOnline));
//   });
//   socket.on("error", (err) => {
//     console.error(`Socket error from ${userId}: ${err.message}`);
//   });
// });

// module.exports = { io, getReceiverId };

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  console.log("Server Start");
});
