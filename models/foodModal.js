const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Food Title is required']
        },
        description: {
            type: String,
            required: [true, 'Food Description is required']
        },
        price: {
            type: Number,
            required: [true, 'Food Price is required']
        },
        imageUrl: {
            type: String,
            default: "https://imgs.search.brave.com/KohMos1kNmas8s-Kp-ltDLLwmbOBJiiu15xaE0Bvui4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzk2LzU1LzYy/LzM2MF9GXzE5NjU1/NjI5NV9Sbm9uVFMx/RjlCT2JLRml1dktK/SlZMNnEyTXNhUnRn/aS5qcGc",
        },
        foodTags: {
            type: String,
        },
        category: {
            type: String,
        },
        code: {
            type: String,
        },
        isAvailabel: {
            type: Boolean,
            default: true,
        },
        resturant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resturant'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 3,
        },
        ratingCount: {
            type: String,
            default: 0,
        }
    },
    { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);