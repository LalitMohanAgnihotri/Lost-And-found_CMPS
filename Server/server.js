import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import redis from "./config/redis.js";

const PORT = process.env.PORT || 5000;

await connectDB();
// await redis.connect();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});