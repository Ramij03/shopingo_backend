const User = require("../models/user.model");

const updateUser= async (req,res)=>{
try{
    const updatedUser= await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },
    {
        new: true,
    }
);
if(!updateUser){
    return res.status(404).json({
        message: "User not found",
    });
}
 res.status(200).json({
    message: "User updated",
    data:updatedUser,
});
}
catch(err){
    console.log(err);
    res.status(500).json({
        message:"User update failed",
        error:err,
    });
}
};

const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User deleted",
            });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "User deletion failed",
            });
    }
};

const getAdmin= async(req,res)=>{
    try{
        const admin= await User.findById(req.params.id);
        if(!admin){
            res.status(404).json({
                message: "User not found",
            });
        }
        const {password, ...info}=admin._doc;//hide password when fetching
        res.status(200).json({
            message: "User has been found",
            data: info,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "User query failed",
            error:err,
        });
    }
};

const getUsers= async(req,res)=>{
    try{
        const users= await User.find();
       
        res.status(200).json({
            message: "Users has been found",
            data: users,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "User query failed",
            error:err,
        });
    }
};

const getUserStats = async (req,res)=>{
    try{
        const date=new Date();
        const lastYear= new Date(date.setFullYear(date.getFullYear()-1));
        const userStats= await User.aggregate([
            {
                $match: {createdAt: {$gte: lastYear}},
            },
            {
                $project:{
                    month:{$month: "$createdAt"},

                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ]);
        res.status(200).json({
            message: "User stats has been found",
            userStats
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "User query failed",
            error:err,
        })
    }
};

module.exports ={
    updateUser,
    deleteUser,
    getAdmin,
    getUsers,
    getUserStats,
};