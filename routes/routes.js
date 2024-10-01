const router= require("express").Router();
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");
const orderRoutes = require("./order.route");
const paymentRoutes = require("./payment.route");
const base="/api/v1" //for repetitive functions in urls

router.use(`${base}/users`, userRoutes);
router.use(`${base}/auth`, authRoutes);
router.use(`${base}/products`, productRoutes);
router.use(`${base}/carts`, cartRoutes);
router.use(`${base}/orders`, orderRoutes);
router.use(`${base}/payments`, paymentRoutes);

module.exports = router;