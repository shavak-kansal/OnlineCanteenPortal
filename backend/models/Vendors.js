const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	manager: {
		type: String,
		required: false
	},
    shop: {
		type: String,
		required: true,
        unique: true
    },
	email: {
		type: String,
		required: true,
        unique: true
	},
	phone:{
		type: Number,
		required: true
	},
    opening:{
        type: Number,
        required: true
    },
    closing:{
        type: Number,
        required: true
    },
	password: {
		type: String,
		required: true
	}
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
