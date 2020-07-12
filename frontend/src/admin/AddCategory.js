import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddCategory = ({ history }) => {
	const [category, setCategory] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const { user, token } = isAuthenticated();

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
			Category has been added successfully
		</div>
	);

	const onSubmit = e => {
		e.preventDefault();
		console.log(isAuthenticated());
		createCategory(token, user._id, { name: category }).then(res => {
			if (res.error) {
				setError(res.error);
			} else {
				setCategory("");
				setError("");
				setSuccess(true);
				setTimeout(() => {
					history.push("/admin/dashboard");
				}, 2000);
			}
		});
		return false;
	};

	const handleChange = e => {
		setCategory(e.target.value);
	};

	const createCategoryForm = () => (
		<div className="bg-dark p-4">
			{alertFailure()}
			{alertSuccess()}

			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Category</label>
					<input
						type="text"
						name="category"
						autoFocus="true"
						onChange={handleChange}
						value={category}
						className="form-control"
						placeholder="Ex. Summer"
						required
					/>
				</div>
				<input
					type="submit"
					className="btn btn-success btn-block"
					value="ADD CATEGORY"
				/>
			</form>
		</div>
	);
	return (
		<Base
			title="Add a Category"
			description="Category should be added to each product inorder to categorise products"
		>
			<div className="row">
				<div className="col-6 mx-auto bg-success p-4">
					<Link to="/admin/dashboard" className="btn btn-warning my-2">
						ADMIN HOME
					</Link>

					{createCategoryForm()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
