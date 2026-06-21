import express from "express";
import { 
        getAllUsers,
        getUser, 
        loginUserController, 
        registerUserController,
        deleteUserController,
        registerAdminController,
        updateUserController 
    } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUser);
router.put(
    "/:id",
    authMiddleware,
    updateUserController
);
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUserController);
router.post("/register-admin", authMiddleware, adminMiddleware, registerAdminController);

export default router;

