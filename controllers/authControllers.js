const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//register
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;
        if (!userName || !email || !password || !address || !phone) {
            return res.status(500).send({
                success: false,
                message: 'All fields are required',
            })
        }

        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).send({
                success: false,
                message: 'Email already exists',
            })
        }
        //hash password
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone
        })
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user,
        })
    } catch (error) {
        // res.status(500).json({ error: error.message });
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error,
        })
    }
};

//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide email or Password'
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials',
            });
        }
        //generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '5d',
        });
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error,
        })
    }
};

module.exports = { registerController, loginController };