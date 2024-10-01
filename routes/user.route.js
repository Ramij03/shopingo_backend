const { updateUser, deleteUser, getAdmin, getUsers, getUserStats } = require("../controllers/user.controller");
const {verifyToken, verifyAdmin} = require("../middleware/verifyToken");

const router= require("express").Router();

router.get("/get-users", (req,res) =>{
    res.send("user");
});

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyAdmin, deleteUser);
router.get("/get-admin/:id",verifyAdmin,getAdmin);
router.get("/",verifyToken,getUsers);
router.get("/stats",verifyAdmin,getUserStats);
module.exports = router;