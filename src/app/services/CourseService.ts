import Course, { ICourse } from "../models/Course.js";
import Folder from "../models/Folder.js";
import Word from "../models/Word.js";
import CourseDTO from "../models/dto/CourseDTO.js";

const createCourse = async (courseDTO: CourseDTO): Promise<ICourse> => {
  const { folderId, name, description, wordIds } = courseDTO;

  const folder = await Folder.findById(folderId);
  if (!folder) {
    throw new Error('Không tìm thấy thư mục');
  }

  const validWords = await Word.find({ _id: { $in: wordIds } });
  if (validWords.length !== wordIds.length) {
    throw new Error('Không tìm thấy từ');
  }

  const course: ICourse = await Course.create({
    folder: folderId,
    name,
    description,
    words: wordIds,
  });

  folder.courses.push((course as any)._id);
  await folder.save();

  return course;
};

const getAllCourse = async (): Promise<ICourse[]> => {
  const courses = await Course.find({});
  return courses;
};

const getCourseById = async (id: string): Promise<ICourse> => {
  const course = await Course.findById(id)
    .populate({
      path: 'words',
      select: 'word meaning phonetic audio image type topic exEnglish exVietnamese',
    })
    .exec();

  if (!course) {
    throw new Error("Không tìm thấy học phần");
  }

  return course;
};


const updateCourse = async (courseDTO: CourseDTO): Promise<ICourse> => {
  const { id, folderId, name, description, wordIds } = courseDTO;

  const course = await Course.findById(id);
  if (!course) {
    throw new Error("Không tìm thấy học phần");
  }

  if (wordIds) {
    const validWords = await Word.find({ _id: { $in: wordIds } });
    if (validWords.length !== wordIds.length) {
      throw new Error("Không tìm thấy học phần");
    }
  }

  // course.set(courseDTO);
  if (name) course.name = name;
  if (description) course.description = description;
  if (wordIds) course.words = wordIds;

  await course.save();
  return course;
};

const deleteCourse = async (id: string): Promise<ICourse> => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    throw new Error("Không tìm thấy học phần");
  }

  return course;
};

export {
  createCourse, deleteCourse, getAllCourse, getCourseById, updateCourse
};

