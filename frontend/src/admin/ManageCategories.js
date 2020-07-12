import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = ({ history }) => {
	const [values, setValues] = useState({
		categories: [],
		error: "",
		success: false
	});

	const { token, user } = isAuthenticated();

	useEffect(() => {
		loadAllCategories();
	}, []);

	const loadAllCategories = () => {
		getAllCategories().then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
				setTimeout(() => {
					history.push("/admin/dashboard");
				}, 2000);
			} else {
				setValues({
					...values,
					categories: res
				});
			}
		});
	};

	const { success, error } = values;

	const alertFailure = () => (
		<div
			style={{ display: error ? "" : "none" }}
			className="alert alert-danger"
		>
			{error}
		</div>
	);

	const alertSuccess = () => (
		<div
			className="alert alert-success"
			style={{ display: success ? "" : "none" }}
		>
			Category has been removed successfully
		</div>
	);

	const deleteThisCategory = categoryId => {
		deleteCategory(token, categoryId, user._id).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
			} else {
				let categories = [...values.categories];
				categories = categories.filter(category => {
					return category._id !== categoryId;
				});
				setValues({
					...values,
					error: "",
					success: true,
					categories: categories
				});
			}
		});
	};

	const getManageCategoriesTable = (category, index) => {
		let url = `/admin/update/category/${category._id}`;
		return (
			<div key={index} className="row my-4 ">
				<div className="col-4">{category?.name}</div>
				<div className="col-4 text-center">
					<Link to={url} className="btn btn-info">
						UPDATE
					</Link>
				</div>
				<div className="col-4 text-center">
					<button
						onClick={() => {
							deleteThisCategory(category._id);
						}}
						className="btn btn-danger"
					>
						DELETE
					</button>
				</div>
			</div>
		);
	};

	return (
		<Base
			title="Manage Categories"
			description="A place to update/delete categories"
		>
			<div className="row">
				<div className="col-8 mx-auto bg-success p-4">
					<Link to="/admin/dashboard" className="btn btn-warning my-2">
						ADMIN HOME
					</Link>

					<div className=" bg-dark p-4">
						{alertFailure()}
						{alertSuccess()}
						{values?.categories?.map((category, index) => {
							return getManageCategoriesTable(category, index);
						})}
					</div>
				</div>
			</div>
		</Base>
	);
};

export default ManageCategories;
