const foodModal = require("../models/foodModal");
const orderModel = require("../models/orderModel");

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
        // console.log(food);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food items found for this restaurant",
            });
        }
        res.status(200).send({
            success: true,
            message: "food base on resturant",
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
};

const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Food ID is required",
            });
        }
        const food = await foodModal.findByIdAndUpdate(foodId, req.body, { new: true });
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food item found to update",
            });
        }
        const { title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabel,
            resturant,
            rating, } = req.body

        const updatedFood = await foodModal.findByIdAndUpdate(foodId, {
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
        }, { new: true })
        res.status(200).send({
            success: true,
            message: "Food Item updated successfully",
            data: updatedFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update food api",
            error,
        })
    }
};

//Delete Food
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Food ID is required",
            });
        }
        const food = await foodModal.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food item found to delete",
            });
        }
        await foodModal.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete food api",
            error,
        })
    }
};

const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "Cart and payment details are required",
            });
        }
        let total = 0
        cart.map((i) => {
            total += i.price;
        })

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id
        })

        await newOrder.save();
        res.status(200).send({
            success: true,
            message: "Order placed successfully",
            order: newOrder,
            total,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in place order api",
            error,
        })
    }
};

const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Order ID is required",
            });
        }
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Order status updated successfully",
            order,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in order status api",
            error,
        })
    }
};

module.exports = {
    createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
}