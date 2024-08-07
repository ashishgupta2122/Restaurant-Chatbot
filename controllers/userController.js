const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//GET User Info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        //hide password
        user.password = undefined;
        res.status(200).send({
            success: true,
            user,
            message: 'User Info retrieved successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Get User Info API',
            error
        })
    }
};

const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        const { userName, address, phone } = req.body;
        if (userName) {
            user.userName = userName;
        }
        if (address) {
            user.address = address;
        }
        if (phone) {
            user.phone = phone;
        }

        await user.save();
        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update User Info API',
            error,
        })
    }
}

//Reset Password
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide email, new password, and answer'
            });
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User not found'
            });
        }
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Reset Password API',
            error,
        })
    }
}

//Update User Passaword
const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: 'Please provide old Password and New Password'
            });
        }
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(500).send({
                success: false,
                message: 'Old Password is incorrect'
            })
        }
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Password Updated Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update User Password API',
            error,
        })
    }
};

const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'User Profile Deleted Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Delete User Profile API',
            error,
        })
    }
}


module.exports = { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController }