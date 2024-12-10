import Word, { IWord } from "../models/Word.js";
import WordDTO from "../models/dto/WordDTO.js";

const createWord = async (wordDTO: WordDTO): Promise<IWord> => {
  const word = new Word(wordDTO);
  return await word.save();
};

const getAllWord = async (): Promise<IWord[]> => {
  const words = await Word.find({});
  if (words.length === 0) {
    throw new Error("Không tìm thấy trong từ điển");
  }
  return words;
};

const getWordById = async (id: string): Promise<IWord> => {
  const word = await Word.findById(id);
  if (!word) {
    throw new Error("Không tìm thấy trong từ điển");
  }
  return word;
};

const checkExistWord = async (word: string): Promise<IWord | null> => {
  const w = await Word.findOne({ word: word });
  if (!w) {
    return null;
  } else {
    return w;
  }
};

const checkValidWords = async (wordIds: string[]): Promise<IWord[] | null> => {
  const validWords = await Word.find({ _id: { $in: wordIds } });
  if (validWords.length !== wordIds.length) {
    return null
  }
  return validWords
};

const updateWord = async (wordDTO: WordDTO): Promise<IWord> => {
  const word = await Word.findById(wordDTO.id);

  if (!word) {
    throw new Error("Không tìm thấy trong từ điển");
  }
  word.set(wordDTO);
  await word.save();
  return word;
};

const deleteWord = async (id: string): Promise<IWord> => {
  const word = await Word.findByIdAndDelete(id);
  if (!word) {
    throw new Error("Không tìm thấy trong từ điển");
  }

  return word;
};

export {
  createWord,
  getWordById,
  updateWord,
  deleteWord,
  getAllWord,
  checkExistWord,
  checkValidWords
};
