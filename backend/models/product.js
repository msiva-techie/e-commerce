const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxlength: 32,
			required: true,
			trim: true,
			unique: true
		},
		description: {
			type: String,
			maxlength: 2000,
			required: true,
			trim: true
		},
		price: {
			type: Number,
			maxlength: 32,
			trim: true,
			required: true
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
			default: 0
		},
		sold: {
			type: Number,
			min: 0,
			default: 0
		},
		photo: {
			data: Buffer,
			contentType: String
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
