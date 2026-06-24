import express from "express";

import {
    getStock
} from "../controllers/productionController.js";

import {
    authMiddleware
} from "../middleware/authMiddleware.js";

import {
    adminMiddleware
} from "../middleware/adminMiddleware.js";


const router = express.Router();


router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getStock
);


export default router;