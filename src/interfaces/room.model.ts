import type { Types } from 'mongoose';

export interface IRoom {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  timestamps: Date
}