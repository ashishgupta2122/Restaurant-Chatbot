const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'category title is required']
        },
        imageUrl: {
            type: String,
            default: 'https://imgs.search.brave.com/KohMos1kNmas8s-Kp-ltDLLwmbOBJiiu15xaE0Bvui4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzk2LzU1LzYy/LzM2MF9GXzE5NjU1/NjI5NV9Sbm9uVFMx/RjlCT2JLRml1dktK/SlZMNnEyTXNhUnRn/aS5qcGc'
        }
    },
    { timestamps: true }
);

//export
module.exports = mongoose.model("Category", categorySchema);