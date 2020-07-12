const router = require("express").Router();
const { signup, signin, signout } = require("./../controllers/auth");
const { check } = require("express-validator");

router.post(
	"/signup",
	[
		check("name", "Name should be atleast 3 characters length").isLength({
			min: 3
		}),
		check("email", "Please Enter Valid Email").isEmail(),
		check(
			"password",
			"Password length should be atleast 6 characters"
		).isLength({
			min: 6
		})
	],
	signup
);

router.post(
	"/signin",
	[
		check("email", "Please Enter Valid Email").isEmail(),
		check("password", "Password length should be atleast 6 characters")
			.not()
			.isEmpty()
	],
	signin
);

router.post("/signout", signout);

module.exports = router;
