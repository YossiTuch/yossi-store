import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs/promises";
import crypto from "crypto";
import Product from "../models/productModel.js";

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Helper to generate file hash
const generateFileHash = async (filePath) => {
  try {
    const fileBuffer = await fs.readFile(filePath);
    return crypto.createHash("md5").update(fileBuffer).digest("hex");
  } catch (error) {
    throw new Error("Failed to generate file hash");
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    // Use timestamp for now, we'll check for duplicates after upload
    cb(null, `image-${Date.now()}-${Math.random().toString(36).substring(7)}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadSingleImage = upload.single("image");

router.post("/", async (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).send({ message: "No image file provided" });
    }

    try {
      const uploadedFilePath = req.file.path;
      const uploadedFileHash = await generateFileHash(uploadedFilePath);

      // Check for duplicate images in uploads directory
      const files = await fs.readdir(uploadsDir);
      let duplicateFound = false;
      let existingFileName = null;

      for (const file of files) {
        if (file === req.file.filename) continue; // Skip the just-uploaded file

        const existingFilePath = path.join(uploadsDir, file);
        try {
          const existingHash = await generateFileHash(existingFilePath);
          if (existingHash === uploadedFileHash) {
            // Duplicate found, delete the new upload and use existing
            await fs.unlink(uploadedFilePath);
            duplicateFound = true;
            existingFileName = file;
            break;
          }
        } catch (err) {
          // Skip files that can't be read
          continue;
        }
      }

      // Check if this image is already used by a product
      if (duplicateFound) {
        const existingImagePath = `/uploads/${existingFileName}`;
        const productUsingImage = await Product.findOne({ image: existingImagePath });
        
        if (productUsingImage) {
          return res.status(200).send({
            message: "Image uploaded successfully (duplicate detected, using existing)",
            image: existingImagePath,
          });
        }
      }

      // Use the uploaded file (or existing duplicate)
      const imagePath = duplicateFound
        ? `/uploads/${existingFileName}`
        : `/uploads/${req.file.filename}`;

      res.status(200).send({
        message: duplicateFound
          ? "Image uploaded successfully (duplicate detected)"
          : "Image uploaded successfully",
        image: imagePath,
      });
    } catch (error) {
      // Clean up uploaded file on error
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkErr) {
        // Ignore cleanup errors
      }
      res.status(500).send({ message: "Error processing image: " + error.message });
    }
  });
});

export default router;