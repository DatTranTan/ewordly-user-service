import User, { IUser } from "../models/User.js";
import UserDTO from "../models/dto/UserDTO.js";

const createUser = async (userDTO: UserDTO): Promise<IUser> => {
  const user = new User(userDTO);
  return await user.save();
};

const getAllUser = async (query: {
  search?: string;
  filter?: string;
}): Promise<IUser[]> => {
  const { search, filter } = query;
  const condition = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(condition);
  return users;
};

const getUserById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return null;
  } else {
    return user;
  }
};

const updateUser = async (userDTO: UserDTO): Promise<IUser> => {
  const user = await User.findById(userDTO.id);
  if (!user) {
    throw new Error("User not found");
  }
  user.set(userDTO);
  return await user.save();
};

const deleteUser = async (id: string): Promise<IUser> => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUser,
};
