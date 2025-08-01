import express from "express";
import { login, register, userProfile } from "../controllers/UserController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, userProfile);

export default router;
