const mongoose= require("mongoose");
const dotenv= require("dotenv");
dotenv.config();
const dbConnect = async ()=>{
try{
  await mongoose.connect(process.env.DB_URL);
    console.log("Db Connected");
}
catch(err){
    console.log(err);
}
};

module.exports=dbConnect;