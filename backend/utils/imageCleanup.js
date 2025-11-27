import fs from "fs/promises";
import path from "path";
import Product from "../models/productModel.js";

const uploadsDir = path.join(process.cwd(), "uploads");

export const cleanupUnusedImages = async () => {
  try {
    const products = await Product.find({}, "image");
    const usedImages = new Set(
      products
        .map((p) => p.image)
        .filter((img) => img && img.startsWith("/uploads/"))
        .map((img) => path.basename(img))
    );

    const files = await fs.readdir(uploadsDir);

    let deletedCount = 0;
    for (const file of files) {
      if (!usedImages.has(file)) {
        const filePath = path.join(uploadsDir, file);
        try {
          const stats = await fs.stat(filePath);
          if (stats.isFile()) {
            await fs.unlink(filePath);
            deletedCount++;
            console.log(`Deleted unused image: ${file}`);
          }
        } catch (err) {
          console.warn(`Could not delete ${file}:`, err.message);
        }
      }
    }

    console.log(`Cleanup complete. Deleted ${deletedCount} unused images.`);
    return deletedCount;
  } catch (error) {
    console.error("Error cleaning up images:", error);
    throw error;
  }
};

export const deleteProductImage = async (imagePath) => {
  try {
    if (imagePath && imagePath.startsWith("/uploads/")) {
      const filename = path.basename(imagePath);
      const filePath = path.join(uploadsDir, filename);

      const otherProducts = await Product.find({ image: imagePath });

      if (otherProducts.length === 0) {
        try {
          await fs.unlink(filePath);
          console.log(`Deleted image: ${filename}`);
        } catch (err) {
          console.warn(`Could not delete image ${filename}:`, err.message);
        }
      } else {
        console.log(
          `Image ${filename} is still in use by ${otherProducts.length} product(s), keeping it.`
        );
      }
    }
  } catch (error) {
    console.error("Error deleting product image:", error);
  }
};

