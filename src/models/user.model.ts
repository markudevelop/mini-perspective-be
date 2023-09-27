import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  created: Date;
}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
