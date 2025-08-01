import express from "express";
import { admin, protect } from "../middlewares/authMiddlewares.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.post("/", protect, admin, createUser);
router.put("/:id", protect, admin, updateUser);
router.put("/:id", protect, admin, deleteUser);

export default router;
