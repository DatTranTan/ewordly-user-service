import { Application } from "express";
import UserRouter from "./UserRouter.js";
import WordRouter from "./WordRouter.js";

function route(app: Application): void {
  app.use("/user", UserRouter);
  app.use("/word", WordRouter);
}

export default route;
