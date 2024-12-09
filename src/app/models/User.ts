import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  sex: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  sex: { type: String, required: false },
  avatar: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.log(err);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
export { IUser };
