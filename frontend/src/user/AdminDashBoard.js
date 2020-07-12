import React from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const AdminDashBoard = () => {
	const {
		user: { name, email }
	} = isAuthenticated();

	const adminLeft = () => (
		<div className="card bg-dark">
			<h4 className="card-header">Navigation</h4>
			<ul className="list-group ">
				<li className="list-group-item bg-dark ">
					<Link to="/admin/create/category" className="nav-link text-white">
						Create Category
					</Link>
				</li>
				<li className="list-group-item bg-dark">
					<Link to="/admin/manage/categories" className="nav-link text-white ">
						Manage Categories
					</Link>
				</li>
				<li className="list-group-item bg-dark">
					<Link to="/admin/create/product" className="nav-link text-white">
						Create Product
					</Link>
				</li>
				<li className="list-group-item bg-dark">
					<Link to="/admin/manage/products" className="nav-link text-white ">
						Manage Products
					</Link>
				</li>
				<li className="list-group-item bg-dark">
					<Link to="" className="nav-link text-white">
						Manage Orders
					</Link>
				</li>
			</ul>
		</div>
	);

	const adminRight = () => (
		<div className="card bg-dark">
			<h4 className="card-title p-3">Admin Information</h4>
			<div className="card-body">
				<div className="row">
					<div className="col-6">
						<p>
							<span className="badge badge-success">Name:</span> {name}
						</p>
						<p>
							<span className="badge badge-success">E-mail:</span> {email}
						</p>
					</div>
					<div className="col-6">
						<p>
							<span className="badge badge-danger">ADMIN</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Base
			title="Welcome to Admin area"
			description="Manage your orders and products"
			// className="text-center text-white"
		>
			<div className="row">
				<div className="col-8 mx-auto bg-success p-4">
					<div className="row">
						<div className="col-4">{adminLeft()}</div>
						<div className="col-8">{adminRight()}</div>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
