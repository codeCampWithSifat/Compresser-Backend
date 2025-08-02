import Product from "../models/Product.js";
import User from "../models/User.js";

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    discountPrice,
    category,
    collections,
    brand,
    sizes,
    colors,
    material,
    gender,
    images,
  } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      category,
      collections,
      brand,
      sizes,
      colors,
      material,
      gender,
      images,
      user: req.user?._id,
    });
    console.log("Product", product);
    const createProduct = await product.save();
    res.status(201).json(createProduct);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { createProduct, getAllProducts };
