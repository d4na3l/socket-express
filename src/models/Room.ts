import { IRoom } from "../interfaces/room.model";
import { model, Model, models, Schema } from "mongoose";

const RoomSchema = new Schema<IRoom>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
}, { timestamps: true }
);

const Room = models?.MessageSchema as Model<IRoom>
  || model('Room', RoomSchema);

export default Room