import express from "express";
import {
    getCart,
    addProduct,
    removeProduct,
    clear
} from "../controllers/cartController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();


router.get(
    "/",
    authMiddleware,
    getCart
);


router.post(
 "/add",
 authMiddleware,
 addProduct
);


router.delete(
    "/remove/:productId",
    authMiddleware,
    removeProduct
);


router.delete(
    "/clear",
    authMiddleware,
    clear
);



export default router;