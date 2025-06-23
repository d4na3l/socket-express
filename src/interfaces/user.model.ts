import { Types } from 'mongoose';

export enum UserType {
  guest = 'guest',
  autheticated = 'autheticated'
};

export enum Status {
  active = 'active',
  inactive = 'inactive'
}

export interface IUser {
  _id: Types.ObjectId,
  type: UserType,
  name?: string;
  lastname?: string;
  status: Status
  connectionId?: string,
  timestamps: Date;
}