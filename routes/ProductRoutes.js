import express from "express";
import { admin, protect } from "../middlewares/authMiddlewares.js";
import { createProduct } from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);

export default router;
