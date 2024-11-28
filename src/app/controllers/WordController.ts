import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  createWord,
  getWordById,
  updateWord,
  deleteWord,
  getAllWord,
  checkExistWord,
} from "../services/WordService.js";
import { BaseResponse } from "../models/dto/BaseResponse.js";
import { parseDuration } from "../utils/FileExtension.js";
import Word, { IWord as WordType } from "../models/Word.js";
import "../../env.js";

class WordController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request body: " + JSON.stringify(req.body));
      const existWord = await checkExistWord(req.body.word);
      if (existWord) {
        const response = new BaseResponse(
          4001,
          `Từ ${req.body.word} đã tồn tại trong từ điển`,
          null
        );
        res.status(400).json(response);
        return;
      }
      const word = await createWord(req.body);

      const response = new BaseResponse(
        0o000,
        `Thêm ${req.body.word} thành công`,
        word
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
      const word = await getAllWord();

      const response = new BaseResponse(0o000, "Danh sách từ điển", word);
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
      console.log("Request body: " + JSON.stringify(req.body));
      const word = await updateWord(req.body);
      const response = new BaseResponse(
        0o000,
        `Cập nhật ${req.body.word} thành công`,
        word
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
      console.log("Request body: " + JSON.stringify(req.body));
      const word = await deleteWord(req.body.id);
      const response = new BaseResponse(
        0o000,
        `Xóa ${req.body.word} thành công`,
        word
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "" + error, null);
      res.status(500).json(response);
    }
  }
}

export default new WordController();