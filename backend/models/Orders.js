const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
	foodId: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: false
	},
	time: {
		type: String,
		required: true,
		unique: true
	},
	cost: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		required: false
	},
	shop: {
		type: String,
		required: false
	}
});

module.exports = Order = mongoose.model("Orders", OrderSchema);
