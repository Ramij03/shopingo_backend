const { createProduct, 
    updateProduct, 
    deleteProduct, 
    getProduct, 
    getProducts, } = 
    require("../controllers/product.controller");
const {verifyAdmin}= require("../middleware/verifyToken");

const router= require("express").Router();

router.post("/", verifyAdmin, createProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

module.exports = router;