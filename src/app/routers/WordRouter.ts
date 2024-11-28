import { Router } from "express";
import WordController from "../controllers/WordController.js";

const router: Router = Router();

router.post("/", WordController.create);
router.get("/", WordController.get);
router.put("/", WordController.update);
router.delete("/", WordController.delete);
// router.get("/", WordController.getAll);

export default router;
