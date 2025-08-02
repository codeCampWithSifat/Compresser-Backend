import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      // enum: [
      //   "Urban Threads",
      //   "Modern Fit",
      //   "Street Style",
      //   "Beach Breeze",
      //   "Fashionista",
      //   "ChicStyle",
      //   "Urban Chic",
      // ],
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    collections: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      // enum: [
      //   "Cotton",
      //   "Wool",
      //   "Denim",
      //   "Polyester",
      //   "Silk",
      //   "Linen",
      //   "Viscose",
      //   "Fleece",
      //   "Cotton Blend",
      // ],
    },
    gender: {
      type: String,
      enum: ["Men", "Women"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
          default: "I love you",
        },
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
