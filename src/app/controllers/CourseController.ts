import { NextFunction, Request, Response } from "express";
import "../../env.js";
import { BaseResponse } from "../models/dto/BaseResponse.js";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourseById,
  updateCourse
} from "../services/CourseService.js";
import { getFolderById } from "../services/FolderService.js";

class CourseController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + JSON.stringify(req.body));

      const folder = await getFolderById(req.body.folderId)

      if (!folder) {
        const response = new BaseResponse(4001, "Không có quyền truy cập", null);
        res.status(400).json(response);
        return;
      }

      const course = await createCourse(req.body);

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

  public async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + JSON.stringify(req.body));
      const course = await getAllCourse();

      const response = new BaseResponse(0o000, "Danh sách học phần", course);
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "" + error, null);
      res.status(500).json(response);
    }
  }

  public async getDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + JSON.stringify(req.params));
      const { id } = req.params
      const course = await getCourseById(id);

      const response = new BaseResponse(0o000, "Danh sách học phần", course);
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "" + error, null);
      res.status(500).json(response);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + req.body);
      const course = await updateCourse(req.body);
      const response = new BaseResponse(
        0o000,
        `Cập nhật ${course.name} thành công`,
        course
      );
      res.status(200).json('');
    } catch (error) {
      const response = new BaseResponse(5000, "" + error, null);
      res.status(500).json(response);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + req.body);
      const course = await deleteCourse(req.body.id);
      const response = new BaseResponse(
        0o000,
        `Xóa ${course.name} thành công`,
        course
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "" + error, null);
      res.status(500).json(response);
    }
  }
}

export default new CourseController();
