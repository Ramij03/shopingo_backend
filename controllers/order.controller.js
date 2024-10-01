const Order = require("../models/Order.model");

const createOrder= async (req,res)=>{
    try{
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({
            message:"Order created successfully",
            data:order
        });
        }
    catch(err){
            console.log(err);
            res.status(500).json({message:err.message});
        }
};

const updateOrder = async (req,res)=>{
    try{
        const OrderId = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(OrderId, {
            $set:req.body,
        }, 
        {
            new:true
        }
    );
        if(!updatedOrder){
            return res.status(404).json({message:"Order not found"});
            }
        res.status(200).json({
            message:"Order Updated",
            updatedOrder
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error updating Order",
            error:err,
        })
    };
};

const deleteOrder = async (req, res) => {
    try {
      const OrderId = req.params.id;
      const deleteOrder = await Order.findByIdAndDelete(OrderId);
  
      if (!deleteOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({
        message: "Order deleted",
        deleteOrder,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error deleting Order",
        error: err,
      });
    }
  };
  

const getUserOrder = async (req,res)=>{
    try{
        const order=await Order.findOne({userId: req.params.id});
        if(!order){
            return res.status(404).json({message:"Order not found"});
            }
        res.status(200).json({
            order,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Order not found",
        });
    }
};

const getOrders = async (req,res)=>{
    try{
        const Orders= await Order.find();
        res.status(200).json({
            Orders,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error fetching products",
        });
    }
};

const getMonthlyIncome = async(req,res)=>{
    try{
        const date= new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth()-1));
        const prevMonth = new Date(new Date(lastMonth.setMonth(lastMonth.getMonth()-1)));
        const income = await Order.aggregate([
            {
                $match:{createdAt:{$gte:prevMonth}}
            },
            {
                $project:{
                    month:{$month: "$createdAt"},
                    sales:"$amount"
                },
            },
            {
                $group:{_id:"$month", total:{$sum:"$total"},}
            }
        ]);
        res.status(200).json({
            message:"Income:",
            income,
        })  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error",
            });
    }
};

module.exports= {createOrder, updateOrder, deleteOrder, getUserOrder, getOrders,getMonthlyIncome};
