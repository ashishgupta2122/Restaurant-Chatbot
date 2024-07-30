const foodModal = require("../models/foodModal");
const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabel,
            resturant,
            rating,
        } = req.body;

        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: "Please Provide all fields",
            });
        }
        const newFood = new foodModal({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabel,
            resturant,
            rating,
        });

        await newFood.save();
        res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create food api",
            error,
        });
    }
};

const getAllFoodController = async (req, res) => {
    try {
        const food = await foodModal.find({})
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food items found",
            });
        }
        res.status(200).send({
            success: true,
            totalFoods: food.length,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all food api",
            error,
        })
    }
};

const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Food ID is required",
            });
        }
        const food = await foodModal.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food item found",
            });
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get single food api",
            error,
        })
    }
};

const getFoodByResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Restaurant ID is required",
            });
        }
        const food = await foodModal.find({ resturnat: resturantId });
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food items found for this restaurant",
            });
        }
        res.status(200).send({
            success: true,
            message: "food base on restuatrn",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get food by resturant api",
            error,
        })
    }
}

module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController }