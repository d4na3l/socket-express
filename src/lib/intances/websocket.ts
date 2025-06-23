import { Server as IOServer } from "socket.io";
import { type Server as httpServer } from "http";
import { registerSocketHandlers } from "../../controllers/socket.controller";

export class Websocket {
  io: IOServer;

  constructor(httpServer: httpServer, front_url: string) {
    this.io = new IOServer(httpServer, {
      cors: {
        origin: front_url,
        methods: ["GET", "POST"]
      }
    });

  }

  mainHandler() {
    registerSocketHandlers(this.io);
  }
}