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

const Room = models.MessageScema as Model<IRoom>
  || model<IRoom>('Room', RoomSchema);

export default Room