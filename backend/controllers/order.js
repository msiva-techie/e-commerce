const { ProductInCart, Order } = require("./../models/order");

// param middleware

exports.getOrderById = (req, res, next, id) => {
	Order.findById(id)
		.populate("products.product", "name price")
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "unable to get the order"
				});
			}
			req.order = order;
			next();
		});
};

exports.createOrder = (req, res, refund = () => {}) => {
	req.body.order.user = req.profile._id;
	new Order(req.body.order).save((err, order) => {
		if (err) {
			console.log(err.toString());
			refund();
			return res.status(400).json({
				error: "unable to save the order"
			});
		}
		return res.json({
			success: req.body.success,
			order
		});
	});
};

exports.gettAllOrders = (req, res) => {
	Order.find()
		.populate("user", "_id name")
		.exec((err, orders) => {
			if (err) {
				return res.status(400).json({
					error: "unable to get the orders"
				});
			}
			return res.json(orders);
		});
};

exports.getAllOrderStatus = (req, res) => {
	res.send(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
	Order.findByIdAndUpdate(
		req.order._id,
		{ $set: { status: req.body.status } },
		{ new: true, useFindAndModify: false }
	).exec((err, order) => {
		if (err) {
			return res.status(400).json({
				error: "unable to update order status"
			});
		}
		return res.json(order);
	});
};
