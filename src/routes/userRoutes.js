import express from "express";
import { getAllUsers, getUser, loginUserController, registerUserController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/",adminMiddleware, authMiddleware, getAllUsers);
router.get("/:id", getUser);
router.post("/register", registerUserController);
router.post("/login", loginUserController);

export default router;

