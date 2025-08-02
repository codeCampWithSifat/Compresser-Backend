import Product from "../models/Product.js";
import User from "../models/User.js";

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    discountPrice,
    category,
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
      brand,
      sizes,
      colors,
      material,
      gender,
      images,
      user: req.user?._id,
    });
    const createProduct = await product.save();
    res.status(201).json(createProduct);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

export { createProduct };
