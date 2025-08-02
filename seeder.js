import mongoose from "mongoose";
import "dotenv/config";
import Product from "./models/Product.js";
import products from "../data/products.js";
import User from "./models/User.js";

mongoose.connect(process.env.MONGODB_URL);

const seedData = async () => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create a default admin
    const createuser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    });

    const userID = createuser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);
  } catch (error) {
    console.error("Error Seeding The Data", error);
    process.exit(1);
  }
};

seedData();
