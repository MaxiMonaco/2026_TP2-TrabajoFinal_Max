import express from "express";
import { 
    getOrders,
    getOrder,
    updateOrder,
    deleteOrderController,
    editOrder,
    cancelOrderController,
    getOrdersByUserAdminController
} from "../controllers/orderController.js";
   
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrder);
router.get("/usuario/:userId", authMiddleware, adminMiddleware, getOrdersByUserAdminController);
router.put("/:id/cancel", authMiddleware, cancelOrderController);
router.put("/:id/status", authMiddleware, adminMiddleware, updateOrder);
router.put("/:id", authMiddleware, adminMiddleware, editOrder);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrderController);



export default router;
