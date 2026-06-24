import express from "express";
import { 
    getOrders,
    getOrder, 
    updateOrder, 
    deleteOrderController, 
    createOrderController, 
    cancelOrderController,
    getOrdersByUserAdminController
 } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrderController);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrder);
router.get("/usuario/:userId", authMiddleware, adminMiddleware, getOrdersByUserAdminController);
router.post("/:id/cancel", authMiddleware, cancelOrderController);
router.put("/:id", authMiddleware, adminMiddleware, updateOrder);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrderController);

export default router;
