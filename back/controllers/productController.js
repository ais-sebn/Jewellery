const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

/**
 * GET /api/products
 * Fetch all products
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch products", error: err.message });
  }
};

/**
 * POST /api/products
 * Add product with image upload (multer)
 */
exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Basic validation
    if (!name || price === undefined) {
      if (req.file) removeFile(req.file.filename);
      return res.status(400).json({ msg: "Name and price are required" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "Product image is required" });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      removeFile(req.file.filename);
      return res.status(400).json({ msg: "Price must be a valid positive number" });
    }

    const product = await Product.create({
      name: name.trim(),
      price: numericPrice,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(product);
  } catch (err) {
    if (req.file) removeFile(req.file.filename);
    res.status(500).json({ msg: "Failed to add product", error: err.message });
  }
};

/**
 * DELETE /api/products/:id
 * Delete product + image file
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Remove image file from disk
    if (product.image) {
      const filename = path.basename(product.image);
      removeFile(filename);
    }

    await product.deleteOne();
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete product", error: err.message });
  }
};

/**
 * Utility: safely remove uploaded file
 */
function removeFile(filename) {
  const filePath = path.join("uploads", filename);
  fs.unlink(filePath, (err) => {
    if (err) console.error("File delete error:", err.message);
  });
}
