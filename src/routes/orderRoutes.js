import express from "express";

import {
    myOrders,
    allOrders,
    updateStatus,
    deleteOrderController
} from "../controllers/orderController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";


const router = express.Router();



router.get(
    "/",
    authMiddleware,
    myOrders
);



router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    allOrders
);



router.put(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    updateStatus
);



router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteOrderController
);


 
export default router;