import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const Menu = ({ history }) => {
	const setCurrentTab = path => {
		if (window.location.pathname === path) {
			return { color: "#2ecc72" };
		} else {
			return { color: "#FFFFFF" };
		}
	};
	return (
		<ul className="nav nav-tabs bgdark">
			<li className="nav-item">
				<Link style={setCurrentTab("/")} className="nav-link" to="/">
					Home
				</Link>
			</li>
			{/* {isAuthenticated()?.user?.role === 0 && (
				<li className="nav-item">
					<Link
						style={setCurrentTab("/user/dashboard")}
						className="nav-link"
						to="/user/dashboard"
					>
						Dashboard
					</Link>
				</li>
			)} */}
			{isAuthenticated()?.user?.role === 1 && (
				<li className="nav-item">
					<Link
						style={setCurrentTab("/admin/dashboard")}
						className="nav-link"
						to="/admin/dashboard"
					>
						Dashboard
					</Link>
				</li>
			)}
			<li className="nav-item">
				<Link
					style={setCurrentTab("/user/cart")}
					className="nav-link"
					to="/user/cart"
				>
					Cart
				</Link>
			</li>
			{!isAuthenticated() && (
				<Fragment>
					<li className="nav-item">
						<Link
							style={setCurrentTab("/signin")}
							to="/signin"
							className="nav-link"
						>
							Sign in
						</Link>
					</li>
					<li className="nav-item">
						<Link
							style={setCurrentTab("/signup")}
							to="/signup"
							className="nav-link"
						>
							Sign up
						</Link>
					</li>
				</Fragment>
			)}

			{isAuthenticated() && (
				<li
					className="nav-item"
					onClick={() => {
						signout(() => {
							history.push("/signin");
						});
					}}
				>
					<span className="nav-link text-warning">Sign out</span>
				</li>
			)}
		</ul>
	);
};

export default withRouter(Menu);
