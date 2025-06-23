import { Types } from 'mongoose';

export interface IMessage {
  _id: Types.ObjectId,
  sender: Types.ObjectId;
  receiver?: Types.ObjectId;
  content: string;
  room_id: Types.ObjectId;
  timestamps: Date;
}