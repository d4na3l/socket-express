import { Server, Socket } from "socket.io";
import User from "../models/User";
import { userType, status } from "../interfaces/user.model";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Nuevo cliente conectado: ${socket.id}`);

    socket.on("disconnect", async (reason) => {
      console.log(`❌ Cliente desconectado: ${socket.id} (${reason})`);

      if (socket.data.userId) {
        await User.findByIdAndUpdate(socket.data.userId, {
          status: status.inactive,
          connectionId: null,
        });
      }
    });
  });
}
