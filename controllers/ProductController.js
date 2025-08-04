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
  const {
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  } = req.query;
  try {
    let query = {};

    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.color = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.minPrice.$gte = Number(minPrice);
      if (maxPrice) query.maxPrice.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { material: { $regex: search, $options: "i" } },
        { gender: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    let sort;
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 10);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const bestSeller = async (req, res) => {
  try {
    const bestSellers = await Product.find({}).sort({ rating: -1 });
    if (bestSeller) {
      return res.json(bestSellers);
    } else {
      res.status(404).json({ message: "No Best Seller Found" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const newArrivals = async (req, res) => {
  try {
    // Fetch Latest 8 Product From The Database
    const newArrival = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    res.json(newArrival);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export {
  createProduct,
  getAllProducts,
  singleProduct,
  bestSeller,
  newArrivals,
};
