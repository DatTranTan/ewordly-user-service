import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { BaseResponse } from "../models/dto/BaseResponse.js";
import "../../env.js";

const SECRET_KEY = process.env.NODE_SECRETKEY;

if (!SECRET_KEY) {
  throw new Error(
    "NODE_SECRET_KEY is not defined in the environment variables"
  );
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Không xác thực được người dùng" });
      return;
    }
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      res.status(401).json({ message: "Không xác thực được người dùng" });
      return;
    }
    // console.log(token);
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        return res
          .status(403)
          .json({ message: 'Không xác thực được người dùng' });
      }

      // console.log(`payload: ${JSON.stringify((payload as any).user)}`);
      res.locals.user = (payload as any).user

      next();
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new BaseResponse(5000, (error as Error).message, null));
  }
};

export default auth;
