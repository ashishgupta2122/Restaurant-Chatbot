const mongoose = require('mongoose')

//schema
const resturantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'image url is required'],
    },
    foods: {
        type: Array,
        required: [true, 'foods are required'],
    },
    time: {
        type: String,
        required: [true, 'time is required'],
    },
    pickup: {
        type: String,
        required: [true, 'pickup is required'],
    },
    delivery: {
        type: Boolean,
        required: [true, 'delivery is required'],
    },
    isOpen: {
        type: Boolean,
        required: [true, 'open status is required'],
    },
    logoUrl: {
        type: String,
        required: [true, 'logo url is required'],
    },
    rating: {
        type: Number,
        required: [true, 'rating is required'],
        min: 1,
        max: 5,
        default: 0,
    },
    ratingCount: {
        type: String
    },
    code: {
        type: String,
    },
    coords: {
        id: { type: String, },
        latitude: { type: Number },
        latitudeDelta: { type: Number },
        longitude: { type: Number },
        longitudeDelta: { type: Number },
        address: { type: String },
        title: { type: String },
    }
}, { timestamps: true })

module.exports = mongoose.model('Resturant', resturantSchema);