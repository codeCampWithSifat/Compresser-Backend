import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/database.js";
import userRoutes from "./routes/UserRoutes.js";
import adminUsersRoutes from "./routes/AdminRoutes.js";
const app = express();
const port = process.env.PORT || 3001;

// use all the middleware
app.use(cors());
app.use(express.json());

// connect to the database
connectDB();

// connected all the router
app.use("/api/users", userRoutes);
app.use("/api/adminUsers", adminUsersRoutes);

// Testing Routes
app.get("/api/server", (req, res) => {
  res.send("Hello Business Project Hello 123");
});

app.listen(port, () => {
  console.log(`Business Port ${port}`);
});
