const router = require("express").Router();
const {
	getCategoryById,
	getCategory,
	getCategories,
	createCategory,
	updateCategory,
	removeCategory
} = require("./../controllers/category");
const {
	isSignedIn,
	isAuthenticated,
	isAdmin
} = require("./../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.get("/:categoryId", getCategory);

router.get("/", getCategories);

router.post("/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

router.put(
	"/:categoryId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateCategory
);

router.delete(
	"/:categoryId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	removeCategory
);

module.exports = router;
