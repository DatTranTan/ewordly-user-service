import { Router } from "express";
import UserController from "../controllers/UserController.js";
import auth from "../midleware/auth.js";

const router: Router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/read", auth, UserController.read);
router.post("/update", UserController.update);
router.delete("/delete/:id", UserController.delete);
router.get("/", UserController.all);

export default router;
