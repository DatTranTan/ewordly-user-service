import mongoose, { Document, Schema, Types } from "mongoose";

interface IFolder extends Document {
  user: Types.ObjectId;
  courses: Types.ObjectId[];
  name: string;
  topic: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  name: { type: String, required: true },
  topic: { type: String, required: true },
  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Folder = mongoose.model<IFolder>("Folder", FolderSchema);

export default Folder;
export { IFolder };
