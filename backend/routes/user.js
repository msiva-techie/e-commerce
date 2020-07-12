const router = require("express").Router();
const { isSignedIn, isAuthenticated } = require("./../controllers/auth");
const { check } = require("express-validator");
const {
	getUser,
	getUserById,
	updateUser,
	getUserPurchaseList
} = require("../controllers/user");

router.param("userId", getUserById);

router.get("/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/:userId/orders", isSignedIn, isAuthenticated, getUserPurchaseList);

module.exports = router;
