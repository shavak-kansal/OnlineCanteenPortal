const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodItemSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: false
	},
    rating:{
        type: Number,
        required: false
    },
    veg:{
        type: Number,
        required: false
    },
    addons: [String],
    addonsPrice: [Number],
    tags: [String],
    shop:{
        type: String,
        required: false
    }
});

module.exports = Food = mongoose.model("Foods", FoodItemSchema);
