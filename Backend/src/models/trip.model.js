const mongoose = require('mongoose');

// 1. Hotel Options Schema
const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    pricePerNight: { type: String, required: true },
    rating: { type: String, required: true },
    description: { type: String, required: true }
}, { _id: false });

// 2. Activities Schema (For each day)
const activitySchema = new mongoose.Schema({
    time: { type: String, required: true },
    placeName: { type: String, required: true },
    details: { type: String, required: true },
    ticketPrice: { type: String, required: true }
}, { _id: false });

// 3. Daily Itinerary Schema
const dailyItinerarySchema = new mongoose.Schema({
    day: { type: Number, required: true },
    theme: { type: String, required: true },
    activities: [activitySchema]
}, { _id: false });

// 4. Main Trip Schema
const tripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: [true, "Destination is required"]
    },
    days: {
        type: Number,
        required: [true, "Number of days is required"]
    },
    budget: {
        type: String,
        enum: ["Cheap", "Moderate", "Luxury"],
        required: [true, "Budget is required"]
    },
    travelers: {
        type: Number,
        default: 1
    },
    estimatedTotalCost: {
        type: String
    },
    hotelOptions: [hotelSchema],
    itinerary: [dailyItinerarySchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    timestamps: true
});

const tripModel = mongoose.model("Trip", tripSchema);

module.exports = tripModel;