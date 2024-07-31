const mongoose = require("mongoose");

//schema
const orderSchema = new mongoose.Schema(
    {
        foods: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Foods"
            }
        ],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "delivered"],
            default: "pending",
        },
    },
    { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", orderSchema);