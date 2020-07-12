import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const UpdateCategory = ({ match: { params }, history }) => {
	useEffect(() => {
		loadCategory();
	}, []);

	const [values, setValues] = useState({
		name: "",
		error: "",
		success: false
	});

	const { name, error, success } = values;

	const { user, token } = isAuthenticated();

	const loadCategory = () => {
		getCategory(params.categoryId).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
				setTimeout(() => {
					history.push("/admin/manage/categories");
				}, 2000);
			} else {
				setValues({
					...values,
					name: res.name
				});
			}
		});
	};

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
			Category has been updated successfully
		</div>
	);

	const onSubmit = e => {
		e.preventDefault();

		updateCategory(token, params.categoryId, user._id, { name }).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
			} else {
				setValues({
					name: "",
					error: "",
					success: true
				});
				setTimeout(() => {
					history.push("/admin/manage/categories");
				}, 2000);
			}
		});
		return false;
	};

	const handleChange = e => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};

	const updateCategoryForm = () => (
		<div className="bg-dark p-4">
			{alertFailure()}
			{alertSuccess()}
			<form>
				<div className="form-group">
					<label>Name</label>
					<input
						onChange={handleChange}
						name="name"
						className="form-control"
						value={name}
					/>
				</div>
				<button type="submit" onClick={onSubmit} className="btn btn-success">
					Update Category
				</button>
			</form>
		</div>
	);

	return (
		<Base title="Update Product" description="update the existing product">
			<div className="row">
				<div className="col-6 mx-auto bg-success p-4">
					<Link to="/admin/manage/categories" className="btn btn-warning my-2">
						Manage Categories
					</Link>
					{updateCategoryForm()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateCategory;
