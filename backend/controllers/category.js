const Category = require("./../models/category");

exports.getCategory = (req, res) => {
	res.json(req.category);
};

exports.getCategories = (req, res) => {
	Category.find().exec((err, categories) => {
		if (err) {
			return res.status(400).json({ error: "No categories found" });
		}
		return res.json(categories);
	});
};

exports.createCategory = (req, res) => {
	const { name } = req.body;
	const category = new Category({ name });
	category.save((err, category) => {
		if (err) {
			return res.status(400).json({ error: "unable to create category" });
		}
		res.json(category);
	});
};

exports.updateCategory = (req, res) => {
	req.category.name = req.body.name;
	req.category.save((err, category) => {
		if (err) {
			return res.status(400).json({ error: "unable to update category" });
		}
		res.json(category);
	});
};

exports.removeCategory = (req, res) => {
	req.category.remove((err, category) => {
		if (err) {
			return res.status(400).json({ error: "unable to remove category" });
		}
		res.json({ message: `Successfully removed ${category.name} category` });
	});
};

// middlewares

// param middleware
exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id, (err, category) => {
		if (err || !category) {
			return res.status(400).json({ error: "unable to retrieve category" });
		}
		req.category = category;
		next();
	});
};
