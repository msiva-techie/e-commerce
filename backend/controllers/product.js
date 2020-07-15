const Product = require("./../models/product");
const { IncomingForm } = require("formidable");
const fs = require("fs");
const product = require("./../models/product");

exports.createProduct = (req, res) => {
	const form = new IncomingForm({
		keepExtensions: true,
		maxFileSize: 3000000
	});
	form.parse(req, (err, fields, file) => {
		const fileType = file?.photo?.type.split("/").pop();
		let isTypeValid = ["jpg", "jpeg", "png"].some(type => type === fileType);
		if (err || !isTypeValid) {
			console.log(err);
			console.log(fileType);
			console.log(!isTypeValid);
			return res.status(400).json({
				error: "unable to create product"
			});
		}
		const { name, description, price, stock, category } = fields;
		if (!name || !description || !price || !stock || !category) {
			return res.status(400).json({
				error: "please provide all the fields"
			});
		}
		let ipObj = {
			name,
			description,
			price,
			stock,
			category
		};
		if (file?.photo) {
			const photo = fs.readFileSync(file.photo.path);
			ipObj["photo"] = {
				data: photo,
				contentType: file.photo.type
			};
		}
		new Product(ipObj).save((err, product) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					error: "unable to create product"
				});
			}
			return res.json(product);
		});
	});
};

exports.updateProduct = (req, res) => {
	const form = new IncomingForm({
		keepExtensions: true,
		maxFileSize: 3000000
	});
	form.parse(req, (err, fields, file) => {
		let isTypeValid = true;
		if (file.photo) {
			const fileType = file.photo.type.split("/").pop();
			isTypeValid = ["jpg", "jpeg", "png"].some(type => type === fileType);
		}
		if (err || !isTypeValid) {
			return res.status(400).json({
				error: "unable to update product"
			});
		}
		if (file?.photo) {
			const photo = fs.readFileSync(file.photo.path);
			fields["photo"] = {
				data: photo,
				contentType: file.photo.type
			};
		}
		Product.findByIdAndUpdate(
			req.product._id,
			{ $set: fields },
			{ new: true, useFindAndModify: false }
		).exec((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "unable to update product"
				});
			}
			return res.json(product);
		});
	});
};

exports.deleteProduct = (req, res) => {
	req.product.remove((err, product) => {
		if (err) {
			return res.status(400).json({ error: "unable to remove product" });
		}
		res.json(product);
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	res.json(req.product);
};

exports.getPhoto = (req, res) => {
	if (req?.product?.photo?.data) {
		res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
};

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "unable to get the product"
				});
			}
			req.product = product;
			next();
		});
};

exports.getAllProduct = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortBy, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "unable to get products"
				});
			}
			res.json(products);
		});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}).exec((err, categories) => {
		if (err) {
			return res.status(400).json({
				error: "no categories Found"
			});
		}
		res.json(categories);
	});
};

exports.updateStockAndSold = (req, res, next, refund = () => {}) => {
	let myOperations = req.body.order.products.map(product => {
		let count = product.count ? parseInt(product.count, 10) : 1;

		return {
			updateOne: {
				filter: { _id: product._id, stock: { $gte: count } },
				update: {
					$inc: {
						stock: -count,
						sold: +count
					}
				}
			}
		};
	});

	Product.bulkWrite(myOperations, {}, (err, result) => {
		if (err || result.modifiedCount !== req.body.order.products.length) {
			console.log(err);
			refund();
			return res.status(400).json({
				error: "Updating stock and sold failed"
			});
		}
		console.log({ result });
		next();
	});
};
