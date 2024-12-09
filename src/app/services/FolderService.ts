import mongoose from "mongoose";
import Folder, { IFolder } from "../models/Folder.js";
import FolderDTO from "../models/dto/FolderDTO.js";
import UserDTO from "../models/dto/UserDTO.js";


const getUserFolders = async (userId: string): Promise<IFolder[]> => {
  if (!userId) {
    throw new Error('Không có quyền truy cập');
  }

  const folders = await Folder.find({ user: userId });
  return folders;
};

const createFolder = async (folderDTO: FolderDTO): Promise<IFolder> => {
  const { userId, name, topic } = folderDTO;

  if (!name || !topic) {
    throw new Error('Tên thư mục và chủ đề là bắt buộc');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Không có quyền truy cập');
  }

  const existFolder = await checkExistFolder(name);

  if (existFolder) {
    throw new Error(`Thư mục ${name} đã tồn tại`);
  }

  const folder = new Folder({
    user: new mongoose.Types.ObjectId(userId),
    name: name,
    topic: topic,
  });

  await folder.save();
  return folder;
};

const getAllFolder = async (userId: string): Promise<IFolder[]> => {
  const folders = await getUserFolders(userId);

  return folders;
};

const getFolderById = async (id: string): Promise<IFolder> => {
  const folder = await Folder.findById(id);
  if (!folder) {
    throw new Error("Không tìm thấy thư mục");
  }
  return folder;
};

const checkExistFolder = async (name: string): Promise<IFolder | null> => {
  const folder = await Folder.findOne({ name: name });
  if (!folder) {
    return null;
  } else {
    return folder;
  }
};

const updateFolder = async (folderDTO: FolderDTO): Promise<IFolder> => {
  const { id, userId, name } = folderDTO;

  const folder = await Folder.findOne({ _id: id, user: userId });

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId) || !folder) {
    throw new Error("Không tìm thấy thư mục hoặc không có quyền truy cập");
  }

  const existFolder = await checkExistFolder(name);

  if (existFolder) {
    throw new Error(`Thư mục ${name} đã tồn tại`);
  }

  folder.set(folderDTO);

  await folder.save();
  return folder;
};

const deleteFolder = async (id: string): Promise<IFolder> => {
  const folder = await Folder.findByIdAndDelete(id);
  if (!folder) {
    throw new Error("Không tìm thấy thư mục");
  }

  return folder;
};

export {
  checkExistFolder, getUserFolders, createFolder, deleteFolder,
  getAllFolder, getFolderById,
  updateFolder
};

