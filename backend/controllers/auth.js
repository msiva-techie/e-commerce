const User = require("./../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	const { name, email, password } = req.body;
	new User({ name, email, password }).save((err, user) => {
		if (err) {
			return res.status(400).json({ error: "unable to signup" });
		}
		const { name, email, _id } = user;
		return res.json({
			name,
			email,
			_id
		});
	});
};

exports.signin = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "Signin failed"
			});
		}
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: "Incorrect Email/Password"
			});
		}

		let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
		res.cookie("token", token);
		// let { _id, role, name, email } = user;
		res.json({
			token,
			user
		});
	});
};

exports.signout = (req, res) => {
	res.clearCookie("token");
	res.json({
		message: "Yor are signedout successfully"
	});
};

// middlewares

exports.isSignedIn = expressJwt({
	secret: process.env.SECRET_KEY,
	requestProperty: "auth"
});

// custom middlewares

exports.isAuthenticated = (req, res, next) => {
	if (req?.profile?._id == req?.auth?._id) {
		return next();
	}
	return res.status(403).json({
		error: "Access Denied"
	});
};

exports.isAdmin = (req, res, next) => {
	if (req?.profile?.role === 1) {
		return next();
	}
	return res.status(403).json({
		error: "You are not an Admin. Access Denied"
	});
};
