import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import {
	getProduct,
	getAllCategories,
	updateProduct
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const UpdateProduct = ({ match: { params }, history }) => {
	useEffect(() => {
		loadProduct();
	}, []);

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

	const { user, token } = isAuthenticated();

	const loadProduct = () => {
		getProduct(params.productId).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
				setTimeout(() => {
					history.push("/admin/manage/products");
				}, 2000);
			} else {
				const { name, description, price, stock, category } = res;
				getAllCategories().then(res => {
					if (res.error) {
						setValues({
							...values,
							error: res.error
						});
						setTimeout(() => {
							history.push("/admin/manage/products");
						}, 2000);
					} else {
						console.log("...values", values);
						setValues({
							...values,
							name,
							description,
							price,
							stock,
							category,
							categories: res,
							formData: new FormData(),
							error: ""
						});
					}
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
			Product has been updated successfully
		</div>
	);

	const onSubmit = e => {
		e.preventDefault();

		updateProduct(token, params.productId, user._id, formData).then(res => {
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
					history.push("/admin/manage/products");
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

	const updateProductForm = () => (
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
						value={category._id}
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
					Update Product
				</button>
			</form>
		</div>
	);

	return (
		<Base title="Update Product" description="update the existing product">
			<div className="row">
				<div className="col-6 mx-auto bg-success p-4">
					<Link to="/admin/manage/products" className="btn btn-warning my-2">
						Manage Products
					</Link>
					{updateProductForm()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateProduct;
