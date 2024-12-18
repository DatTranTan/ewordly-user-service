import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUser,
} from "../services/UserService.js";
import { BaseResponse } from "../models/dto/BaseResponse.js";
import { parseDuration } from "../utils/FileExtension.js";
import User, { IUser as UserType } from "../models/User.js";
import "../../env.js";
const ACCESS_TOKEN_LIFE = (
  process.env.NODE_ACCESS_TOKEN_LIFE as string
)?.trim();
const REFRESH_TOKEN_LIFE = (
  process.env.NODE_REFRESH_TOKEN_LIFE as string
)?.trim();
const SECRET_KEY = process.env.NODE_SECRETKEY;

class UserController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("register body: " + JSON.stringify(req.body));
      const checkExistUser = await getUserByEmail(req.body.email);
      if (checkExistUser) {
        const response = new BaseResponse(4001, "User already exist", null);
        res.status(400).json(response);
        return;
      }
      const user = await createUser(req.body);

      const { accessToken, refreshToken } = generateTokens(user);

      var responseData = {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      const response = new BaseResponse(
        0o000,
        "User created successfully",
        responseData
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "Server error : " + error, null);
      res.status(500).json(response);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await getUserByEmail(req.body.email);
      if (user === null) {
        const response = new BaseResponse(4002, "Sai tên đăng nhập", null);
        res.status(401).json(response);
        return;
      }
      const isPasswordValid = await user.comparePassword(req.body.password);
      if (!isPasswordValid) {
        const response = new BaseResponse(4002, "Sai mật khẩu", null);
        res.status(401).json(response);
        return;
      }

      const { accessToken, refreshToken } = generateTokens(user);
      var responseData = {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      const response = new BaseResponse(
        0o000,
        "Đăng nhập thành công",
        responseData
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "Server error : " + error, null);
      res.status(500).json(response);
    }
  }

  public async read(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("entry");
      const user = await getUserById(req.body.payload.user._id);
      const response = new BaseResponse(0o000, "User found", user);
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "Server error : " + error, null);
      res.status(500).json(response);
    }
  }

  public async all(req: Request, res: Response): Promise<void> {
    try {
      const user = await getAllUser(req.query);
      const response = new BaseResponse(0o000, "All User", user);
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "Server error : " + error, null);
      res.status(500).json(response);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await updateUser(req.body);
      const response = new BaseResponse(
        0o000,
        "User updated successfully",
        user
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "Server error : " + error, null);
      res.status(500).json(response);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await deleteUser(req.params.id);
      const response = new BaseResponse(
        0o000,
        "User deleted successfully",
        user
      );
      res.status(200).json(response);
    } catch (error) {
      const response = new BaseResponse(5000, "Server error : " + error, null);
      res.status(500).json(response);
    }
  }
}

const generateTokens = (user: UserType) => {
  const currentDate = new Date();
  const accessTokenExpiry = new Date(
    currentDate.getTime() + parseDuration(ACCESS_TOKEN_LIFE)
  );
  const refreshTokenExpiry = new Date(
    currentDate.getTime() + parseDuration(REFRESH_TOKEN_LIFE)
  );
  const accessTokenPayload = {
    user: user,
    accesTokenExpiry: accessTokenExpiry,
  };
  const refreshTokenPayload = {
    user: user,
    refreshTokenExpiry: refreshTokenExpiry,
  };

  const accessToken = jwt.sign(accessTokenPayload, SECRET_KEY as string, {
    expiresIn: ACCESS_TOKEN_LIFE,
  });

  const refreshToken = jwt.sign(refreshTokenPayload, SECRET_KEY as string, {
    expiresIn: REFRESH_TOKEN_LIFE,
  });

  return { accessToken, refreshToken };
};

export default new UserController();
