import mongoose, { Document, Schema, Types } from "mongoose";

interface IFolder extends Document {
  user: Types.ObjectId;
  name: string;
  topic: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  topic: { type: String, required: true },
  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Folder = mongoose.model<IFolder>("Folder", FolderSchema);

export default Folder;
export { IFolder };
