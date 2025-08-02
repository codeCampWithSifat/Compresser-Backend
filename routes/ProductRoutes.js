import express from "express";
import { admin, protect } from "../middlewares/authMiddlewares.js";
import {
  createProduct,
  getAllProducts,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);
router.get("/", getAllProducts);

export default router;
