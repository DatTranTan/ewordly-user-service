import mongoose, { Document, Schema } from "mongoose";

interface IWord extends Document {
  word: string;
  meaning: string;
  phonetic: string;
  audio: string;
  image: string;
  type: string;
  exampleEn: string;
  exampleVi: string;
  createdAt: Date;
  updatedAt: Date;
}

const WordSchema: Schema = new Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  phonetic: { type: String, required: true },
  audio: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  exampleEn: { type: String, required: false },
  exampleVi: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Word = mongoose.model<IWord>("Word", WordSchema);

export default Word;
export { IWord };
