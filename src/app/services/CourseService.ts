import { Types } from "mongoose";
import Course, { ICourse } from "../models/Course.js";
import Folder from "../models/Folder.js";
import Word from "../models/Word.js";
import CourseDTO from "../models/dto/CourseDTO.js";
import { checkValidWords } from "./WordService.js";

const createCourse = async (courseDTO: CourseDTO): Promise<ICourse> => {
  const { folderId, name, description, wordIds } = courseDTO;

  const folder = await Folder.findById(folderId);
  if (!folder) {
    throw new Error('Không tìm thấy thư mục');
  }

  const course: ICourse = await Course.create({
    name,
    description,
    folder: folderId,
    words: wordIds,
  });

  folder.courses.push((course as any)._id);
  await folder.save();

  return course;
};

const getAllCourse = async (userId: string, folderId: string): Promise<ICourse[]> => {
  if (!folderId || !Types.ObjectId.isValid(folderId as string)) {
    throw new Error("Không tìm thấy thư mục");
  }

  const folder = await Folder.findOne({ _id: folderId, user: userId });
  if (!folder) {
    throw new Error("Không tìm thấy thư mục");
  }

  const courses = await Course.find({ folder: folderId })
  // .populate({
  //   path: 'words',
  //   select: 'word meaning phonetic audio image type topic exEnglish exVietnamese',
  // })
  // .exec();
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

  // if (name) course.name = name;
  // if (description) course.description = description;
  // if (wordIds) course.words = wordIds;

  await course.set(courseDTO);
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

