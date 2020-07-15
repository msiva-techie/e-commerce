const router = require("express").Router();
const { isSignedIn, isAuthenticated } = require("./../controllers/auth");
const { makePaymentByStripe } = require("./../controllers/payment");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
	"/stripe/:userId",
	isSignedIn,
	isAuthenticated,
	makePaymentByStripe
);

module.exports = router;
