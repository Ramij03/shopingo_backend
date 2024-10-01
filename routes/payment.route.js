const { stripe } = require("../controllers/payment.controller");

const router= require("express").Router();

router.post("/payment",stripe);

module.exports=router;
