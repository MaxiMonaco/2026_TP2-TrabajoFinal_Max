import express from "express";

import {
    getOrders,
    getOrder,
    updateOrder,
    deleteOrderController
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
    "/:id/",
    authMiddleware,
    adminMiddleware,
    updateOrder
);



router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteOrderController
);



export default router;