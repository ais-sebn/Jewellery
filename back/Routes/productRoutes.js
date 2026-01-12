const router = require("express").Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

// Get all products
router.get("/", productController.getProducts);

// Add product WITH image upload
// Field name MUST be "image"
router.post("/", upload.single("image"), productController.addProduct);

// Delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
