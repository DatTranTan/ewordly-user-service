import { NextFunction, Request, Response } from "express";
import "../../env.js";
import { BaseResponse } from "../models/dto/BaseResponse.js";
import {
  // createCourse,
  // deleteCourse,
  // getAllCourse,
  // getUserCourses,
  // updateCourse
} from "../services/CourseService.js";
import { getUserById } from "../services/UserService.js";

class CourseController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request locals: " + JSON.stringify(res.locals.user));
      console.log("Request body: " + JSON.stringify(req.body));
      console.log("Request params: " + JSON.stringify(req.params));

      const user = await getUserById(res.locals.user._id)

      if (!user) {
        const response = new BaseResponse(4001, "Không có quyền truy cập", null);
        res.status(400).json(response);
        return;
      }

      // const course = await createCourse(req.body);
      const course = { name: '' }

      const response = new BaseResponse(
        0o000,
        `Thêm ${course.name} thành công`,
        course
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "" + error, null);
      res.status(500).json(response);
    }
  }

  // public async get(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     console.log("Request body: " + JSON.stringify(req.body));
  //     const course = await getAllCourse(res.locals.user._id);

  //     const response = new BaseResponse(0o000, "Danh sách thư mục", course);
  //     res.status(200).json(response);
  //   } catch (error) {
  //     const response = new BaseResponse(5000, "" + error, null);
  //     res.status(500).json(response);
  //   }
  // }

  // public async update(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     console.log("Request body: " + req.body);
  //     // const course = await updateCourse(req.body);
  //     // const response = new BaseResponse(
  //     //   0o000,
  //     //   `Cập nhật ${course.name} thành công`,
  //     //   course
  //     // );
  //     res.status(200).json('');
  //   } catch (error) {
  //     const response = new BaseResponse(5000, "" + error, null);
  //     res.status(500).json(response);
  //   }
  // }

  // public async delete(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     console.log("Request body: " + req.body);
  //     const course = await deleteCourse(req.body.id);
  //     const response = new BaseResponse(
  //       0o000,
  //       `Xóa ${course.name} thành công`,
  //       course
  //     );
  //     res.status(200).json(response);
  //   } catch (error) {
  //     const response = new BaseResponse(5000, "" + error, null);
  //     res.status(500).json(response);
  //   }
  // }
}

export default new CourseController();
