import { Router } from "express";
import FolderController from "../controllers/FolderController.js";

const router: Router = Router();

router.post("/", FolderController.create);
router.get("/", FolderController.get);
router.put("/", FolderController.update);
router.delete("/", FolderController.delete);
// router.get("/", FolderController.getAll);

export default router;
