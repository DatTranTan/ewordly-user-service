import { Router } from "express";
import CourseController from "../controllers/CourseController.js";
import auth from "../midleware/auth.js";

const router: Router = Router();

router.post("/", auth, CourseController.create);
// router.get("/", auth, CourseController.get);
// router.put("/", auth, CourseController.update);
// router.delete("/", auth, CourseController.delete);
// router.get("/", CourseController.getAll);

export default router;
