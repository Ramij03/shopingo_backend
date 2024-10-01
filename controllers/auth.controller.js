const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register= async (req, res) => {
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword
        });
        await newUser.save();

        const { password, ...info } = newUser._doc; // hide password from responses
        res.status(200).json({
            message: "User successfully registered",
            data: info,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error creating User",
            error: err,
        });
    }
}

const login= async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: "Email not found."
            });
        };

        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if (!comparePass) {
            return res.status(401).json({
                message: "Email or Password is incorrect"
            });
        };

        const token = jwt.sign(
            {
                userId: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d",
            },
        );

        const { password, ...info } = user._doc;

        res.status(200).json({
            message: "User logged in",
            data: { ...info, token },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error logging in",
            error: err,
        });
    }
}

module.exports={
    register,
    login,
}