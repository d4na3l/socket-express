import { IUser, Status, UserType } from "../interfaces/user.model";
import { model, Model, models, Schema } from "mongoose";

const UserSchema = new Schema<IUser>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  type: {
    type: String,
    enum: UserType,
    default: UserType.guest,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String
  },
  status: {
    type: String,
    enum: Status,
  },
  connectionId: {
    type: String,
    default: null,
  }
}, { timestamps: true }
);

const User = models.UserScema as Model<IUser>
  || model<IUser>('User', UserSchema);

export default User