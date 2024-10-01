const { createCart, 
    updateCart, 
    deleteCart, 
    getCart, 
    getCarts, } = 
    require("../controllers/cart.controller");
const {verifyToken}= require("../middleware/verifyToken");

const router= require("express").Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, deleteCart);
router.get("/:id",verifyToken, getCart);
router.get("/",verifyToken, getCarts);

module.exports = router;