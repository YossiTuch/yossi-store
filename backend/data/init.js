import dotenv from "dotenv";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

dotenv.config();

const defaultCategories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
];

const sampleProducts = {
  Electronics: [
    {
      name: "Wireless Headphones",
      image: "/images/headphones.jpg",
      brand: "TechBrand",
      quantity: 1,
      description:
        "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.",
      price: 99.99,
      countInStock: 15,
      rating: 0,
      numReviews: 0,
    },
    {
      name: "Smart Watch",
      image: "/images/smartwatch.jpg",
      brand: "TechBrand",
      quantity: 1,
      description:
        "Feature-rich smartwatch with fitness tracking, notifications, and long battery life.",
      price: 199.99,
      countInStock: 10,
      rating: 0,
      numReviews: 0,
    },
    {
      name: "USB-C Hub",
      image: "/images/usbhub.jpg",
      brand: "ConnectTech",
      quantity: 1,
      description:
        "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Perfect for laptops.",
      price: 39.99,
      countInStock: 25,
      rating: 0,
      numReviews: 0,
    },
  ],
  Clothing: [
    {
      name: "Classic T-Shirt",
      image: "/images/tshirt.jpg",
      brand: "FashionBrand",
      quantity: 1,
      description:
        "Comfortable 100% cotton t-shirt. Available in multiple colors and sizes.",
      price: 19.99,
      countInStock: 50,
      rating: 0,
      numReviews: 0,
    },
    {
      name: "Denim Jeans",
      image: "/images/jeans.jpg",
      brand: "FashionBrand",
      quantity: 1,
      description:
        "Classic fit denim jeans. Durable and stylish for everyday wear.",
      price: 49.99,
      countInStock: 30,
      rating: 0,
      numReviews: 0,
    },
  ],
  "Home & Kitchen": [
    {
      name: "Coffee Maker",
      image: "/images/coffeemaker.jpg",
      brand: "HomeTech",
      quantity: 1,
      description:
        "Programmable coffee maker with 12-cup capacity. Perfect for your morning routine.",
      price: 79.99,
      countInStock: 20,
      rating: 0,
      numReviews: 0,
    },
    {
      name: "Laptop Stand",
      image: "/images/laptopstand.jpg",
      brand: "ErgoTech",
      quantity: 1,
      description:
        "Adjustable aluminum laptop stand for better ergonomics and workspace organization.",
      price: 49.99,
      countInStock: 20,
      rating: 0,
      numReviews: 0,
    },
  ],
  "Sports & Outdoors": [
    {
      name: "Yoga Mat",
      image: "/images/yogamat.jpg",
      brand: "FitLife",
      quantity: 1,
      description:
        "Non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and exercise.",
      price: 29.99,
      countInStock: 40,
      rating: 0,
      numReviews: 0,
    },
    {
      name: "Water Bottle",
      image: "/images/waterbottle.jpg",
      brand: "FitLife",
      quantity: 1,
      description:
        "Insulated stainless steel water bottle. Keeps drinks cold for 24 hours.",
      price: 24.99,
      countInStock: 60,
      rating: 0,
      numReviews: 0,
    },
  ],
  Books: [
    {
      name: "Programming Guide",
      image: "/images/book.jpg",
      brand: "TechBooks",
      quantity: 1,
      description:
        "Comprehensive guide to modern programming practices and best practices.",
      price: 34.99,
      countInStock: 25,
      rating: 0,
      numReviews: 0,
    },
  ],
  "Toys & Games": [
    {
      name: "Board Game",
      image: "/images/boardgame.jpg",
      brand: "GameTime",
      quantity: 1,
      description:
        "Fun strategy board game for the whole family. Ages 8 and up.",
      price: 39.99,
      countInStock: 15,
      rating: 0,
      numReviews: 0,
    },
  ],
};

const initCategories = async () => {
  try {
    const existingCategories = await Category.find();
    const existingCategoryNames = existingCategories.map(cat => cat.name);

    const categoriesToCreate = defaultCategories.filter(
      name => !existingCategoryNames.includes(name)
    );

    if (categoriesToCreate.length === 0) {
      console.log("✅ All default categories already exist.");
      return existingCategories;
    }

    const newCategories = await Category.insertMany(
      categoriesToCreate.map(name => ({ name }))
    );

    console.log(
      `✅ Created ${newCategories.length} new categor${
        newCategories.length === 1 ? "y" : "ies"
      }: ${categoriesToCreate.join(", ")}`
    );

    return await Category.find();
  } catch (error) {
    console.error("❌ Error initializing categories:", error);
    throw error;
  }
};

const initProducts = async () => {
  try {
    const existingProductCount = await Product.countDocuments();
    if (existingProductCount > 0) {
      console.log(
        `✅ Products already exist (${existingProductCount} found). Skipping product initialization.`
      );
      return;
    }

    const categories = await Category.find();
    if (categories.length === 0) {
      console.log(
        "⚠️  No categories found. Cannot create products without categories."
      );
      return;
    }

    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    const productsToInsert = [];
    let totalProducts = 0;

    for (const [categoryName, products] of Object.entries(sampleProducts)) {
      const categoryId = categoryMap[categoryName];

      if (!categoryId) {
        console.warn(
          `⚠️  Category "${categoryName}" not found. Skipping products for this category.`
        );
        continue;
      }

      const productsWithCategory = products.map(product => ({
        ...product,
        category: categoryId,
      }));

      productsToInsert.push(...productsWithCategory);
      totalProducts += products.length;
    }

    if (productsToInsert.length === 0) {
      console.log(
        "⚠️  No products to insert. Make sure categories match the product categories."
      );
      return;
    }

    await Product.insertMany(productsToInsert);
    console.log(
      `✅ Successfully created ${productsToInsert.length} sample products!`
    );
    console.log(
      `   Products distributed across ${
        Object.keys(sampleProducts).length
      } categories`
    );
    console.log(
      `   Note: Make sure to add the corresponding image files to backend/images/`
    );
  } catch (error) {
    console.error("❌ Error initializing products:", error);
    throw error;
  }
};

const initialize = async () => {
  try {
    console.log("🚀 Starting database initialization...");

    await initCategories();

    await initProducts();

    console.log("✅ Database initialization complete!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
};

export { initialize, initCategories, initProducts };
