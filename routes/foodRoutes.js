const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController } = require("../controllers/foodController");

const router = express.Router();

router.post("/create", authMiddleware, createFoodController)

router.get('/getAll', getAllFoodController)

router.get('/get/:id', getSingleFoodController)

router.get('/getByResturant/:id', getFoodByResturantController)

module.exports = router;