import Course from "../models/Course.js";
import Word, { IWord } from "../models/Word.js";
import WordDTO from "../models/dto/WordDTO.js";

const createWord = async (wordDTO: WordDTO): Promise<IWord> => {
  const word = new Word(wordDTO);
  return await word.save();
};

const getAllWord = async (
  topic?: string,
  search?: string
): Promise<IWord[]> => {
  const query: {
    topic?: string;
    $or?: [
      { meaning?: { $regex: string; $options: "i" } },
      { word?: { $regex: string; $options: "i" } }
    ];
  } = {};

  if (topic) {
    query.topic = topic;
  }

  if (search) {
    query.$or = [
      { meaning: { $regex: search, $options: "i" } },
      { word: { $regex: search, $options: "i" } },
    ];
  }

  const words = await Word.find(query);

  if (words.length === 0) {
    return [];
  }

  return words;
};

const getWordAvailable = async (
  courseId: string,
  topic?: string,
  search?: string
): Promise<IWord[]> => {
  // Bước 1: Xây dựng query ban đầu
  const query: {
    topic?: string;
    $or?: [
      { meaning?: { $regex: string; $options: "i" } },
      { word?: { $regex: string; $options: "i" } }
    ];
    _id?: { $nin: string[] };
  } = {};

  if (topic) {
    query.topic = topic;
  }

  if (search) {
    query.$or = [
      { meaning: { $regex: search, $options: "i" } },
      { word: { $regex: search, $options: "i" } },
    ];
  }

  // Bước 2: Lấy tất cả wordId đã có trong các Course khác (ngoại trừ courseId hiện tại)
  const usedWords = await Course.find(
    { _id: { $ne: courseId } }, // Lọc ra tất cả các Course trừ course hiện tại
    "words"
  ).lean();

  const usedWordIds = usedWords.flatMap((course) => course.words);

  // Bước 3: Thêm điều kiện loại trừ các từ đã có trong Course khác
  query._id = { $nin: usedWordIds };

  // Bước 4: Truy vấn và trả về kết quả
  const words = await Word.find(query);

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
    return null;
  }
  return validWords;
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

const deleteAllWord = async (): Promise<void> => {
  await Word.deleteMany({});
};

export {
  checkExistWord,
  checkValidWords,
  createWord,
  deleteWord,
  getAllWord,
  getWordById,
  updateWord,
  deleteAllWord,
  getWordAvailable,
};
