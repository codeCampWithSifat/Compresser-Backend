import express from "express";
import { admin, protect } from "../middlewares/authMiddlewares.js";
import {
  bestSeller,
  createProduct,
  getAllProducts,
  newArrivals,
  singleProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);
router.get("/", getAllProducts);
router.get("/best-seller", bestSeller);
router.get("/new-arrivals", newArrivals);
router.get("/:id", singleProduct);

export default router;
