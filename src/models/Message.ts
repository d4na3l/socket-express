import { IMessage } from "../interfaces/message.model";
import { model, Model, models, Schema } from "mongoose";

const MessageSchema = new Schema<IMessage>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  }
}, { timestamps: true }
);

const Message = models.MessageScema as Model<IMessage>
  || model<IMessage>('Message', MessageSchema);

export default Message