const mongoose= require("mongoose");

const {Schema} = mongoose;

const orderModel= new Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            },
        }
    ],
    amount:{
        type:Number,
        required:true,
    },
    address:{
        type:Object,
        required:true,
    },
    status:{
        type:String,
        default:"Pending",
    },
}, {
    timestamps: true,    
});

module.exports= mongoose.model("Order", orderModel);