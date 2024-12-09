import { Types } from "mongoose";

// Define the Article DTO
interface FolderDTO {
  id: string;
  userId: string;
  name: string;
  topic: string;
  image: string;
}

export default FolderDTO;
