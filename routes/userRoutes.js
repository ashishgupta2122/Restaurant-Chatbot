const express = require("express");
const { getUserController, updateUserController, resetPasswordController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/getUser', authMiddleware, getUserController)

router.put('/updateUser', authMiddleware, updateUserController)

router.post('/resetPassword', authMiddleware, resetPasswordController)

module.exports = router;