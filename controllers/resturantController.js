const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
        //validation
        if (!title || !imageUrl || !foods || !time || !pickup || !delivery || !isOpen || !logoUrl || !rating || !ratingCount || !code || !coords) {
            return res.status(500).send({
                message: "Please fill all the fields",
                success: false,
            });
        }
        //check if restaurant already exists
        const newResturant = new resturantModel({ title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords, })
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

module.exports = { createResturantController }