import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import UserDashboard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddProduct from "./admin/AddProduct";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import Product from "./core/Product";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/signup" component={Signup} />

				{/* User Routes */}

				<PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
				<PrivateRoute exact path="/user/cart" component={Cart} />
				<PrivateRoute exact path="/product/:productId" component={Product} />

				{/* Admin Routes */}

				<AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
				<AdminRoute exact path="/admin/create/product" component={AddProduct} />
				<AdminRoute
					exact
					path="/admin/create/category"
					component={AddCategory}
				/>
				<AdminRoute
					exact
					path="/admin/manage/categories"
					component={ManageCategories}
				/>
				<AdminRoute
					exact
					path="/admin/manage/products"
					component={ManageProducts}
				/>
				<AdminRoute
					exact
					path="/admin/update/product/:productId"
					component={UpdateProduct}
				/>
				<AdminRoute
					exact
					path="/admin/update/category/:categoryId"
					component={UpdateCategory}
				/>
			</Switch>
		</Router>
	);
};

export default Routes;
