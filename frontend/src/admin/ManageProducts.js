import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageProducts = ({ history }) => {
	const [values, setValues] = useState({
		products: [],
		error: "",
		success: false
	});

	const { token, user } = isAuthenticated();

	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		getAllProducts().then(res => {
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
					products: res
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
			Product has been removed successfully
		</div>
	);

	const deleteThisProduct = productId => {
		deleteProduct(token, productId, user._id).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
			} else {
				let products = [...values.products];
				products = products.filter(product => {
					return product._id !== productId;
				});
				setValues({
					...values,
					error: "",
					success: true,
					products: products
				});
			}
		});
	};

	const getManageProductsTable = (product, index) => {
		let url = `/admin/update/product/${product._id}`;
		return (
			<div key={index} className="row my-4 ">
				<div className="col-4">{product?.name}</div>
				<div className="col-4 text-center">
					<Link to={url} className="btn btn-info">
						UPDATE
					</Link>
				</div>
				<div className="col-4 text-center">
					<button
						onClick={() => {
							deleteThisProduct(product._id);
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
			title="Manage Products"
			description="A place to update/delete products"
		>
			<div className="row">
				<div className="col-8 mx-auto bg-success p-4">
					<Link to="/admin/dashboard" className="btn btn-warning my-2">
						ADMIN HOME
					</Link>

					<div className=" bg-dark p-4">
						{alertFailure()}
						{alertSuccess()}
						{values?.products?.map((product, index) => {
							return getManageProductsTable(product, index);
						})}
					</div>
				</div>
			</div>
		</Base>
	);
};

export default ManageProducts;
