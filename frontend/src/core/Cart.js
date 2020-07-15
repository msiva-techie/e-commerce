import React, { useEffect, useState, Fragment } from "react";
import Base from "./Base";
import HorizontalCard from "./HorizontalCard";
import { removeFromCart } from "./helper/utils";
import emptycart from "./../emptycart.jpg";
import { Link } from "react-router-dom";
import PaymentByStripe from "./PaymentByStripe";
import Loader from "react-loader-spinner";

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [values, setValues] = useState({
		loading: false,
		success: false,
		error: ""
	});
	useEffect(() => {
		let cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			setProducts(cart);
		}
	}, []);

	const getAmount = () => {
		return products.reduce((total, product) => {
			return total + product.price;
		}, 0);
	};

	const popFromCart = product => {
		removeFromCart(product, () => {
			let productsClone = [...products];
			productsClone = productsClone.filter(item => {
				return item._id !== product._id;
			});
			setProducts(productsClone);
		});
	};
	const alertFailure = () => (
		<div
			style={{ display: values.error ? "" : "none" }}
			className="alert alert-danger"
		>
			Order couldnot be placed!. Any amount deducted will be refunded back.
		</div>
	);

	const alertSuccess = () => (
		<div
			className="alert alert-success"
			style={{ display: values.success ? "" : "none" }}
		>
			Payment Success!. Order placed.
		</div>
	);

	return (
		<Base title="Cart" description="your items in cart">
			{values.loading && (
				<Fragment>
					<div className="overlay"></div>
					<div className="loader">
						<h4>Processing Payment...</h4>
						<Loader type="Oval" color="#fff" height={100} width={100} />
					</div>
				</Fragment>
			)}
			{alertSuccess()}
			{alertFailure()}
			{products && products.length === 0 ? (
				<div className="row">
					<div className="col-8 mx-auto">
						<Link to="/">
							<h4
								className="display-4 p-4"
								style={{
									position: "absolute",
									width: "300px",
									color: "#2C3335",
									fontWeight: "bolder",
									zIndex: 999
								}}
							>
								Your cart is empty. Get your Style now!
							</h4>
							<img
								src={emptycart}
								alt=""
								className="border border-light"
								style={{
									maxWidth: "100%",
									maxHeight: "100%",
									opacity: 0.9
								}}
							/>
						</Link>
					</div>
				</div>
			) : (
				<div className="row">
					<div className="col-7">
						{products.map((product, index) => (
							<HorizontalCard
								key={index}
								product={product}
								popFromCart={popFromCart}
							/>
						))}
					</div>
					<div className="col-5">
						<h3>
							Total amount:
							<span className="badge badge-primary ml-1">
								{getAmount()} <i className="fa fa-inr"></i>
							</span>
						</h3>
						<PaymentByStripe
							products={products}
							values={values}
							setValues={setValues}
						/>
					</div>
				</div>
			)}
		</Base>
	);
};

export default Cart;
