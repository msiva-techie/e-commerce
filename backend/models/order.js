const mongoose = require("mongoose");

const productInCartSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	},
	name: {
		type: String,
		maxlength: 32,
		required: true,
		trim: true
	},
	count: {
		type: Number,
		default: 1
	},
	price: {
		type: Number,
		required: true
	}
});

const ProductInCart = new mongoose.model("ProductInCart", productInCartSchema);

const orderSchema = new mongoose.Schema(
	{
		products: [productInCartSchema],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		address: {
			type: String,
			trim: true,
			required: true,
			maxlength: 3000
		},
		amount: {
			type: Number,
			trim: true,
			required: true
		},
		status: {
			type: String,
			default: "received",
			enum: ["cancelled", "delivered", "shipped", "processing", "received"]
		},
		transactionId: {
			type: String,
			required: true
		},
		isCashOnDelivery: {
			type: Boolean,
			default: false
		},
		updated: {
			type: Date
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = {
	ProductInCart,
	Order
};
