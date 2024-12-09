import { Types } from "mongoose";

// Define the Article DTO
interface CourseDTO {
  user: Types.ObjectId;
  name: string;
  topic: string;
  image: string;
}

export default CourseDTO;
