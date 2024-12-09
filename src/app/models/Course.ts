import mongoose, { Document, Schema, Types } from "mongoose";

interface ICourse extends Document {
  // folder: Types.ObjectId;
  name: string;
  description: string;
  words: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WordSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  // folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Course = mongoose.model<ICourse>("Course", WordSchema);

export default Course;
export { ICourse };
