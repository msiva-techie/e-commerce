import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import testImg from "./../test.jpg";
import ImageHelper from "./ImageHelper";
import { addToCart, removeFromCart } from "./helper/utils";

const Card = ({ product }) => {
	const [addToCartButton, setAddToCartButton] = useState(true);
	const [removeFromCartButton, setRemoveFromCartButton] = useState(false);

	useEffect(() => {
		let cart = JSON.parse(localStorage.getItem("cart"));
		cart.forEach(item => {
			if (item._id === product._id) {
				setAddToCartButton(false);
				setRemoveFromCartButton(true);
			}
		});
	}, []);

	const pushToCart = () => {
		addToCart(product, () => {
			setAddToCartButton(false);
			setRemoveFromCartButton(true);
		});
	};

	const popFromCart = () => {
		removeFromCart(product, () => {
			setAddToCartButton(true);
			setRemoveFromCartButton(false);
		});
	};

	return (
		<div
			className="card bg-dark text-white border border-light"
			style={{ width: "15rem" }}
		>
			<Link to={`/product/${product._id}`}>
				{!product?._id && (
					<img
						src={testImg}
						className="card-img-top"
						alt="..."
						style={{ maxHeight: "100%", maxWidth: "100%" }}
					/>
				)}

				{product?._id && <ImageHelper productId={product._id} />}
			</Link>

			<div className="card-body text-center">
				<Link
					to={`/product/${product._id}`}
					className="text-white"
					style={{ textDecoration: "none" }}
				>
					<h5
						className="card-title"
						style={{
							whiteSpace: "nowrap",
							width: "200px",
							overflow: "hidden",
							textOverflow: "ellipsis"
						}}
					>
						{product?.name}
					</h5>
					{/* <p className="card-text">{product.description}</p> */}
					<h4>
						<p className="card-text badge badge-primary">
							{product?.price} <i className="fa fa-inr"></i>
						</p>
					</h4>
				</Link>
				<Link
					to={`/user/cart`}
					onClick={pushToCart}
					className="btn btn-success btn-block mb-2"
				>
					Buy now
				</Link>
				{addToCartButton && (
					<button
						// to="/user/dashboard"
						className="btn btn-warning btn-block mb-2"
						onClick={pushToCart}
					>
						Add to cart
					</button>
				)}
				{removeFromCartButton && (
					<button
						// to="/user/dashboard"
						className="btn btn-danger btn-block"
						onClick={popFromCart}
					>
						Remove from cart
					</button>
				)}
			</div>
		</div>
	);
};

export default withRouter(Card);
