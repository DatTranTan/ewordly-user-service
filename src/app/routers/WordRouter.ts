import { Router } from "express";
import WordController from "../controllers/WordController.js";

const router: Router = Router();

router.post("/", WordController.create);
router.get("/", WordController.get);
router.post("/available", WordController.getWordAvailable);
router.put("/", WordController.update);
router.delete("/", WordController.delete);
router.delete("/deleteAll", WordController.deleteAll);

export default router;
