const router = require("express").Router();
const {
	getOrderById,
	createOrder,
	updateOrderStatus,
	getAllOrderStatus,
	gettAllOrders
} = require("./../controllers/order");
const {
	isSignedIn,
	isAuthenticated,
	isAdmin
} = require("./../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStockAndSold } = require("../controllers/product");

router.param("orderId", getOrderById);

router.param("userId", getUserById);

router.post(
	"/:userId",
	isSignedIn,
	isAuthenticated,
	updateStockAndSold,
	pushOrderInPurchaseList,
	createOrder
);

router.get(
	"/status/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getAllOrderStatus
);

router.get("/:userId", isSignedIn, isAuthenticated, isAdmin, gettAllOrders);

router.put(
	"/:orderId/status/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateOrderStatus
);

module.exports = router;
