const mongoose= require("mongoose");

const {Schema} = mongoose;

const cartModel= new Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    product:[
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
    
}, {
    timestamps: true,    
});

module.exports= mongoose.model("Cart", cartModel);