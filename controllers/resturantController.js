const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
        //validation
        if (!title || !coords) {
            return res.status(500).send({
                message: "Please fill all the fields",
                success: false
            });
        }
        //check if restaurant already exists
        const newResturant = new resturantModel({ title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords })
        await newResturant.save()
        res.status(201).send({
            success: true,
            message: "Restaurant created successfully",
            data: newResturant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Create Restaurant API',
            error: error.message
        });
    }
}

const getAllResturantController = async (req, res) => {
    try {
        const resturent = await resturantModel.find({})
        if (!resturent) {
            return res.status(404).send({
                success: false,
                message: 'No restaurants found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Restaurants retrieved successfully',
            data: resturent
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Restaurant API',
            error: error.message
        });
    }
}

//Get Resturant by id
const getResturantByIdController = async (req, res) => {
    try {
        const id = req.params.id
        const resturant = await resturantModel.findById(id)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: 'No restaurant found with this ID'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Restaurant retrieved successfully',
            data: resturant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get Restaurant by ID API',
            error: error.message
        });
    }
}

const deleteResturantController = async (req, res) => {
    try {
        const id = req.params.id
        const resturant = await resturantModel.findByIdAndDelete(id)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: 'No restaurant found with this ID'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Delete Restaurant API',
            error: error.message
        })
    }
}

module.exports = { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController }