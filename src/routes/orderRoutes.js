import express from "express";

import {
    getOrders,
    getOrder,
    updateOrder,
    cancelOrder,
    deleteOrderController,
    editOrder
} from "../controllers/orderController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";


const router = express.Router();



router.get(
    "/",
    authMiddleware,
    getOrders
);

router.get(
    "/:id",
    authMiddleware,
    getOrder
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    editOrder
);

router.put(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    updateOrder
);

router.put(
    "/:id/cancel",
    authMiddleware,
    cancelOrder
);



router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteOrderController
);



export default router;