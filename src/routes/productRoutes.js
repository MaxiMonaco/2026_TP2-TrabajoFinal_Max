import express from "express";
import * as controller from "../controllers/productController.js";

const router = express.Router();

router.get("/",authMiddleware, adminMiddleware,controller.getAll);
router.get("/:id", controller.getById);




router.post("/", authMiddleware, adminMiddleware, controller.create);
router.put("/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/:id", authMiddleware, adminMiddleware, controller.remove);

export default router;