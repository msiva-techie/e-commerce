import React, { useEffect, useState } from "react";
import Base from "./Base";
import ImageWithMagnifier from "./ImageWithMagnifier";
import { getProduct } from "./helper/coreapicalls";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "./helper/utils";

const Product = ({ match: { params } }) => {
	const [product, setProduct] = useState("");
	const [error, setError] = useState("");
	const [addToCartButton, setAddToCartButton] = useState(true);
	const [removeFromCartButton, setRemoveFromCartButton] = useState(false);

	useEffect(() => {}, []);
	useEffect(() => {
		getProduct(params.productId).then(res => {
			if (res.error) {
				setError(res.error);
			} else {
				setProduct(res);
				let cart = JSON.parse(localStorage.getItem("cart"));
				console.log({ cart });
				cart.forEach(item => {
					if (item._id === params.productId) {
						setAddToCartButton(false);
						setRemoveFromCartButton(true);
					}
				});
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

	const alertFailure = () => (
		<div
			style={{ display: error ? "" : "none" }}
			className="alert alert-danger"
		>
			{error}
		</div>
	);

	return (
		<Base title="Fashion Store" description="Pick your fashion">
			{alertFailure()}
			<div className="row">
				<div className="col-6">
					<ImageWithMagnifier productId={product._id} />
				</div>
				<div className="col-6">
					<p className="display-4">{product?.name}</p>
					<h1>
						<p className="badge badge-primary">
							{product?.price} <i className="fa fa-inr"></i>
						</p>
					</h1>
					<p className="lead">{product?.description}</p>
					<div className="button-container">
						<Link
							to="/user/cart"
							onClick={pushToCart}
							className="btn btn-success btn-block"
						>
							BUY NOW
						</Link>
						{addToCartButton && (
							<button
								className="btn btn-warning btn-block"
								onClick={pushToCart}
							>
								ADD TO CART
							</button>
						)}
						{removeFromCartButton && (
							<button
								className="btn btn-danger btn-block"
								onClick={popFromCart}
							>
								REMOVE FROM CART
							</button>
						)}
					</div>
				</div>
			</div>
		</Base>
	);
};

export default Product;
