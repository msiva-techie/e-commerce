const router = require("express").Router();
const {
	getProductById,
	createProduct,
	getProduct,
	getPhoto,
	getAllProduct,
	updateProduct,
	deleteProduct,
	getAllUniqueCategories
} = require("./../controllers/product");
const {
	isSignedIn,
	isAuthenticated,
	isAdmin
} = require("./../controllers/auth");
const { getUserById } = require("./../controllers/user");

router.param("productId", getProductById);
router.param("userId", getUserById);

router.post(
	"/userid/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct
);
router.get("/", getAllProduct);
router.get("/categories", getAllUniqueCategories);
router.get("/:productId", getProduct);
router.get("/:productId/photo", getPhoto);

router.put(
	"/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateProduct
);

router.delete(
	"/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteProduct
);

module.exports = router;
