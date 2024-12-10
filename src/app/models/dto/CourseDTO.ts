import { Types } from "mongoose";
import WordDTO from "./WordDTO";

// Define the Article DTO
interface CourseDTO {
  id: string;
  wordIds: string[];
  folderId: string;
  description: string;
  name: string;
  topic: string;
  image: string;
}

export default CourseDTO;
