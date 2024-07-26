const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/getUser', authMiddleware, getUserController)

router.put('/updateUser', authMiddleware, updateUserController)

router.post('/resetPassword', authMiddleware, resetPasswordController)

router.post('/updatePassword', authMiddleware, updatePasswordController)

router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)

module.exports = router;