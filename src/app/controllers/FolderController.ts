import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import "../../env.js";
import { BaseResponse } from "../models/dto/BaseResponse.js";
import {
  checkDuplicateFolder,
  checkExistFolder,
  createFolder,
  deleteFolder,
  getAllFolder,
  getFolderById,
  updateFolder
} from "../services/FolderService.js";

class FolderController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + JSON.stringify(res.locals.user));
      const { name, topic } = req.body
      const userId = res.locals.user._id

      if (!Types.ObjectId.isValid(userId)) {
        const response = new BaseResponse(4001, "Người dùng không hợp lệ", null);
        res.status(400).json(response);
        return;
      }

      if (!name || !topic) {
        const response = new BaseResponse(4001, "Nhập các trường bắt buộc", null);
        res.status(400).json(response);
        return;
      }

      const existFolder = await checkDuplicateFolder(name, topic, userId);
      if (existFolder) {
        const response = new BaseResponse(4001, "Thư mục đã tồn tại", null);
        res.status(400).json(response);
        return;
      }

      const folder = await createFolder(req.body, userId);

      const response = new BaseResponse(
        0o000,
        `Thêm ${folder.name} thành công`,
        folder
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
      const folder = await getAllFolder(res.locals.user._id);

      const response = new BaseResponse(0o000, "Danh sách thư mục", folder);
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
      const folder = await getFolderById(id);

      const response = new BaseResponse(0o000, "Chi tiết thư mục", folder);
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
      const userId = res.locals.user._id
      const { id } = req.body


      if (!checkExistFolder(id)) {
        const response = new BaseResponse(4001, "Nhập các trường bắt buộc", null);
        res.status(400).json(response);
        return;
      }

      const folder = await updateFolder(req.body, userId);
      const response = new BaseResponse(
        0o000,
        `Cập nhật ${folder.name} thành công`,
        folder
      );
      res.status(200).json(response);
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
      const folder = await deleteFolder(req.body.id);
      const response = new BaseResponse(
        0o000,
        `Xóa ${folder.name} thành công`,
        folder
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "" + error, null);
      res.status(500).json(response);
    }
  }
}

export default new FolderController();
