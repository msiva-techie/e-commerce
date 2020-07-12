const User = require("./../models/user");
const { Order } = require("./../models/order");

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	res.json(req.profile);
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		req.profile._id,
		{
			$set: req.body
		},
		{
			new: true,
			useFindAndModify: false
		}
	).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({ error: "failed to update user" });
		}
		return res.json(user);
	});
};

exports.getUserPurchaseList = (req, res) => {
	Order.find({ user: req.profile._id })
		.populate("user", "_id email name")
		.execute((err, orders) => {
			if (err) {
				return res.status(400).json({
					error: "cannot retrieve orders"
				});
			}
			return res.json(orders);
		});
};

// middlewares

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.products.forEach(product => {
		const { _id, name, description, price, category, quantity } = product;
		purchases.push({
			_id,
			name,
			description,
			price,
			category,
			quantity,
			amount: req.body.order.amount,
			transactionId: req.body.order.transactionId
		});
	});
	User.findByIdAndUpdate(
		req.profile._id,
		{
			$push: {
				purchases: purchases
			}
		},
		{
			new: true,
			useFindAndModify: false
		}
	).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({ error: "failed to update purchases" });
		}
		return next();
	});
};

// param middleware

exports.getUserById = (req, res, next, id) => {
	User.findById(id, function (err, user) {
		if (err || !user) {
			return res.status(400).json({
				error: "User Not Found"
			});
		}
		req.profile = user;
		next();
	});
};
