import { Types } from 'mongoose';

export enum userType {
  guest = 'guest',
  authenticated = 'authenticated'
};

export enum status {
  active = 'active',
  inactive = 'inactive'
}

export interface IUser {
  _id: Types.ObjectId,
  user_type: userType,
  username?: string,
  password?: string,
  status: status,
  connectionId: string
}

export type userDTO = Omit<IUser, 'password' | 'id'>

export type LoginUserDTO = Pick<IUser, 'username' | 'password'>

export interface CreateUserDTO
  extends Pick<IUser, 'username' | 'password'> {
  'confirm_password': string
}