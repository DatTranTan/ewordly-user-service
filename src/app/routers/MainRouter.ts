import { Application } from "express";
import UserRouter from "./UserRouter.js";
import WordRouter from "./WordRouter.js";
import FolderRouter from "./FolderRouter.js";

function route(app: Application): void {
  app.use("/user", UserRouter);
  app.use("/word", WordRouter);
  app.use("/folder", FolderRouter);
}

export default route;
