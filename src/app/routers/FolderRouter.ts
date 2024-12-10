import { Router } from "express";
import FolderController from "../controllers/FolderController.js";
import auth from "../midleware/auth.js";

const router: Router = Router();

router.post("/", auth, FolderController.create);
router.get("/", auth, FolderController.get);
router.put("/", auth, FolderController.update);
router.delete("/", auth, FolderController.delete);
router.get("/:id", FolderController.getDetail);

export default router;
