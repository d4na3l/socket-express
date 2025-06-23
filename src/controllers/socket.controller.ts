// src/controllers/socket.controller.ts
import { Server, Socket } from "socket.io";
import { Types } from "mongoose";
import User from "../models/User";
import { UserType, Status } from "../interfaces/user.model";
import Message from '../models/Message';
import Room from "../models/Room";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Nuevo cliente conectado: ${socket.id}`);

    socket.on("createGuest", async (callback) => {
      const user = await User.create({
        _id: new Types.ObjectId(),
        type: UserType.guest,
        status: Status.active,
        connectionId: socket.id,
      });

      socket.data.userId = user._id.toString();
      callback({ user });
    });

    socket.on("registerUser", async (payload: { name: string; lastname: string }, callback) => {
      const user = await User.findByIdAndUpdate(
        socket.data.userId,
        {
          type: UserType.autheticated,
          name: payload.name,
          lastname: payload.lastname,
        },
        { new: true }
      );

      callback({ user });
    });

    socket.on("joinRoom", async (payload: { roomId: string }, callback) => {
      const { roomId } = payload;
      const room = await Room.findById(roomId);
      if (!room) return callback({ error: "Room no existe" });

      socket.join(roomId);
      callback({ room });

      socket.to(roomId).emit("userJoined", { userId: socket.data.userId });
    });

    socket.on("leaveRoom", (payload: { roomId: string }, callback) => {
      socket.leave(payload.roomId);

      callback({ success: true });

      socket.to(payload.roomId).emit("userLeft", { userId: socket.data.userId });
    });

    socket.on("sendMessage", async (payload: { roomId: string; content: string }, callback) => {
      const message = await Message.create({
        _id: new Types.ObjectId(),
        sender: socket.data.userId,
        room_id: payload.roomId,
        content: payload.content,
      });

      io.to(payload.roomId).emit("newMessage", message);
      callback({ message });
    });

    socket.on("sendPrivateMessage", async (data) => {
      const receiver = await User.findById(data.receiverId);

      if (receiver?.connectionId) {
        io.to(receiver.connectionId).emit("newPrivateMessage", data);
      }
    });

    socket.on("disconnect", async (reason) => {
      console.log(`❌ Cliente desconectado: ${socket.id} (${reason})`);

      if (socket.data.userId) {
        await User.findByIdAndUpdate(socket.data.userId, {
          status: Status.inactive,
          connectionId: null,
        });
      }
    });
  });
}
