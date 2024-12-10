import mongoose, { Types } from "mongoose";
import Folder, { IFolder } from "../models/Folder.js";
import FolderDTO from "../models/dto/FolderDTO.js";


const getUserFolders = async (userId: string): Promise<IFolder[]> => {
  if (!userId) {
    throw new Error('Không có quyền truy cập');
  }

  const folders = await Folder.find({ user: userId });
  return folders;
};

const createFolder = async (folderDTO: FolderDTO, userId: string): Promise<IFolder> => {
  const { name, topic, image } = folderDTO;

  const folder = new Folder({
    user: new Types.ObjectId(userId),
    name: name,
    topic: topic,
    image: image
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

const checkDuplicateFolder = async (name: string, topic: string, userId: string): Promise<boolean> => {
  const existFolder = await Folder.findOne({ name, topic, user: userId });
  return existFolder ? true : false;
};

const checkExistFolder = async (id: string): Promise<boolean> => {
  const existFolder = await Folder.exists({ _id: id });
  return existFolder ? true : false
};

const updateFolder = async (folderDTO: FolderDTO, userId: string): Promise<IFolder> => {
  const { id } = folderDTO;

  const folder = await Folder.findOne({ _id: id, user: userId });

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId) || !folder) {
    throw new Error("Không tìm thấy thư mục hoặc không có quyền truy cập");
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
  checkDuplicateFolder, checkExistFolder, createFolder,
  deleteFolder,
  getAllFolder,
  getFolderById, getUserFolders, updateFolder
};

