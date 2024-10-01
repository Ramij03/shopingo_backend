const Product = require("../models/product.model");

const createProduct= async (req,res)=>{
    try{
        const categories= req.body.categories? req.body.categories.split(","):[];
        const product = new Product({
            ...req.body,
            categories:categories,
            //image: req.file.path, //when using upload images
    });
        await product.save();
        res.status(201).json({
            message:"Product created successfully",
            data:product
        });
        }
    catch(err){
            console.log(err);
            res.status(500).json({message:err.message});
        }
};

const updateProduct = async (req,res)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(productId, {
            $set:req.body,
        }, 
        {
            new:true
        }
    );
        if(!product){
            return res.status(404).json({message:"Product not found"});
            }
        res.status(200).json({
            message:"Product Updated",
            product
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error updating product",
            error:err,
        })
    };
};

const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const deleteProduct = await Product.findByIdAndDelete(productId);
  
      if (!deleteProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({
        message: "Product deleted",
        deleteProduct,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error deleting product",
        error: err,
      });
    }
  };
  

const getProduct = async (req,res)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
            }
        res.status(200).json({
            product,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Product not found",
        });
    }
};

const getProducts = async (req,res)=>{
    try{
        const qlatest = req.query.latest;
        const qcategory= req.query.category;

        let product;
        if(qlatest){
            product = await Product.find().sort({createdAt:-1}).limit(3);
            }
        else if(qcategory){
            product = await Product.find({
                categories:{
                    $in: [qcategory]
                }
            });
        }
        else{
            product= await Product.find();
        }
        res.status(200).json({
            product,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error fetching products",
        });
    }
}

module.exports= {createProduct, updateProduct, deleteProduct, getProduct, getProducts};
