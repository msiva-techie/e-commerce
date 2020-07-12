import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = ({ history }) => {
	const [values, setValues] = useState({
		photo: "",
		name: "",
		description: "",
		price: "",
		stock: "",
		category: "",
		categories: [],
		error: "",
		success: false,
		formData: ""
	});

	useEffect(() => {
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
					categories: res,
					formData: new FormData()
				});
			}
		});
	}, []);

	const { user, token } = isAuthenticated();

	const {
		name,
		description,
		price,
		stock,
		category,
		categories,
		error,
		success,
		formData
	} = values;

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
			Product has been added successfully
		</div>
	);

	const onSubmit = e => {
		e.preventDefault();
		createProduct(token, user._id, formData).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
			} else {
				setValues({
					name: "",
					description: "",
					price: "",
					stock: "",
					category: "",
					error: "",
					success: true
				});
				setTimeout(() => {
					history.push("/admin/dashboard");
				}, 2000);
			}
		});
		return false;
	};

	const handleChange = e => {
		const value =
			e.target.name === "photo" ? e.target.files[0] : e.target.value;
		setValues({
			...values,
			[e.target.name]: value
		});
		formData.set(e.target.name, value);
	};

	const createProductForm = () => (
		<div className="bg-dark p-4">
			{alertFailure()}
			{alertSuccess()}
			<form>
				<div className="form-group">
					<label className="">Post photo</label>
					<input
						onChange={handleChange}
						className="form-control-file"
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange}
						name="name"
						className="form-control"
						placeholder="Name"
						value={name}
					/>
				</div>
				<div className="form-group">
					<textarea
						onChange={handleChange}
						name="description"
						className="form-control"
						placeholder="Description"
						value={description}
					/>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange}
						type="number"
						className="form-control"
						placeholder="Price"
						value={price}
						name="price"
					/>
				</div>
				<div className="form-group">
					<select
						onChange={handleChange}
						className="form-control"
						placeholder="Category"
						value={category}
						name="category"
					>
						<option>Select a category</option>
						{categories?.map((category, index) => {
							return (
								<option key={index} value={category._id}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange}
						type="number"
						className="form-control"
						placeholder="Available quantity"
						value={stock}
						name="stock"
					/>
				</div>

				<button type="submit" onClick={onSubmit} className="btn btn-success">
					Create Product
				</button>
			</form>
		</div>
	);

	return (
		<Base title="Add a Product" description="Create a new product">
			<div className="row">
				<div className="col-6 mx-auto bg-success p-4">
					<Link to="/admin/dashboard" className="btn btn-warning my-2">
						ADMIN HOME
					</Link>

					{createProductForm()}
				</div>
			</div>
		</Base>
	);
};

export default AddProduct;
