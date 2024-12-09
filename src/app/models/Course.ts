import mongoose, { Document, Schema, Types } from "mongoose";

interface ICourse extends Document {
  folder: Types.ObjectId; // Tham chiếu đến Folder
  word: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WordSchema: Schema = new Schema({
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  word: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Course = mongoose.model<ICourse>("Course", WordSchema);

export default Course;
export { ICourse };
