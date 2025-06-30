import { IUser, status, userType } from "../interfaces/user.model";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<IUser>(
  {
    user_type: {
      type: String,
      enum: Object.values(userType),
      default: userType.guest,
    },
    username: {
      unique: 'Username already taken',
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(status),
    },
    connectionId: {
      type: String,
      default: null,
    }
  }, { timestamps: true }
);

const UserModel = models?.User || model('User', UserSchema);

export default UserModel