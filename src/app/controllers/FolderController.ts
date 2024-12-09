import { NextFunction, Request, Response } from "express";
import "../../env.js";
import { BaseResponse } from "../models/dto/BaseResponse.js";
import {
  createFolder,
  deleteFolder,
  getAllFolder,
  getUserFolders,
  updateFolder
} from "../services/FolderService.js";
import { getUserById } from "../services/UserService.js";

class FolderController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + JSON.stringify(res.locals.user));
      console.log("Request body: " + JSON.stringify(req.body));

      const user = await getUserById(res.locals.user._id)

      if (!user) {
        const response = new BaseResponse(4001, "Không có quyền truy cập", null);
        res.status(400).json(response);
        return;
      }

      const folder = await createFolder(req.body);

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

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + req.body);
      const folder = await updateFolder(req.body);
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
