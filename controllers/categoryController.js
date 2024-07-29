const categoryModel = require("../models/categoryModel");

const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "Title and imageUrl are required"
            });
        }
        const newCat = new categoryModel({ title, imageUrl });
        await newCat.save();
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            categoryModel: newCat
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error creating category" });
        return;
    }
}

const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No categories found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error fetching categories",
            data: null
        });
    }
}

const updateCatController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "No Category Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            categoryModel: updatedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating category",
            data: null
        });
    }
};

const deleteCatController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                message: "Id is required"
            });
        }
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(500).send({
                success: false,
                message: "No category found with this id",
                error
            });
        }
        await categoryModel.findById(id)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            data: null
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error deleting category",
            data: null
        });
    }
}

module.exports = { createCatController, getAllCatController, updateCatController, deleteCatController }