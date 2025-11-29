import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import productValidation from "../validations/Joi/productValidation.js";
import { deleteProductImage } from "../utils/imageCleanup.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { error } = productValidation(req.fields);
    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        details: error.details.map(d => d.message),
      });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { error } = productValidation(req.fields);
    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        details: error.details.map(d => d.message),
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await deleteProductImage(product.image);
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully", product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 6;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * pageSize;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const [count, products] = await Promise.all([
      Product.countDocuments({ ...keyword }),
      Product.find({ ...keyword })
        .select("name image brand price description category rating numReviews")
        .limit(pageSize)
        .skip(skip)
        .lean(),
    ]);

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page < Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .select("name image brand price description category rating numReviews")
      .populate("category", "name")
      .limit(12)
      .sort({ createdAt: -1 })
      .lean();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const updateProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: productId, reviewId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    // Check if the review belongs to the current user
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to edit this review");
    }

    // Update the review
    review.rating = Number(rating);
    review.comment = comment;

    // Recalculate product rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(200).json({ message: "Review updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .select("name image brand price description category rating numReviews")
      .sort({ rating: -1 })
      .limit(4)
      .lean();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .select("name image brand price description category rating numReviews")
      .sort({ _id: -1 })
      .limit(5)
      .lean();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio, page = 1, limit = 50 } = req.body;
    const skip = (page - 1) * limit;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const [products, total] = await Promise.all([
      Product.find(args)
        .select("name image brand price description category rating numReviews")
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(args),
    ]);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const fetchProductsByIds = asyncHandler(async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.json([]);
    }
    const products = await Product.find({ _id: { $in: ids } })
      .select("name image brand price description category rating numReviews")
      .lean();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export {
  addProduct,
  updateProductDetails,
  deleteProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  updateProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  fetchProductsByIds,
};
