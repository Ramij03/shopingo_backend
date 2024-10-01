const Cart = require("../models/cart.model");

const createCart= async (req,res)=>{
    try{
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).json({
            message:"Cart created successfully",
            data:cart
        });
        }
    catch(err){
            console.log(err);
            res.status(500).json({message:err.message});
        }
};Cart

const updateCart = async (req,res)=>{
    try{
        const cartId = req.params.id;
        const updatedCart = await Cart.findByIdAndUpdate(cartId, {
            $set:req.body,
        }, 
        {
            new:true
        }
    );
        if(!updatedCart){
            return res.status(404).json({message:"Cart not found"});
            }
        res.status(200).json({
            message:"Cart Updated",
            updatedCart
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error updating cart",
            error:err,
        })
    };
};

const deleteCart = async (req, res) => {
    try {
      const cartId = req.params.id;
      const deleteCart = await Cart.findByIdAndDelete(cartId);
  
      if (!deleteCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json({
        message: "Cart deleted",
        deleteCart,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error deleting cart",
        error: err,
      });
    }
  };
  

const getCart = async (req,res)=>{
    try{
        const cartItem = await Cart.findOne({userId: req.params.id});
        if(!cartItem){
            return res.status(404).json({message:"Cart not found"});
            }
        res.status(200).json({
            cartItem,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Cart not found",
        });
    }
};

const getCarts = async (req,res)=>{
    try{
        const carts= await Cart.find();
        res.status(200).json({
            carts,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error fetching products",
        });
    }
};

module.exports= {createCart, updateCart, deleteCart, getCart, getCarts};
