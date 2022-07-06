const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
        unique: true
	},
	age:{
		type: Number,
		required: false
	},
    batch:{
        type: String,
        required: true
    },
	password: {
		type: String,
		required: true
	},
	wallet: {
		type: Number,
		required: false
	},
	favorites: [String],
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
