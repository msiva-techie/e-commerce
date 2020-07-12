import React, { useEffect, useState } from "react";
import Base from "./Base";
import HorizontalCard from "./HorizontalCard";
import { removeFromCart } from "./helper/utils";
import emptycart from "./../emptycart.jpg";
import { Link } from "react-router-dom";

const Cart = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		let cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			setProducts(cart);
		}
	}, []);

	const popFromCart = product => {
		removeFromCart(product, () => {
			let productsClone = [...products];
			productsClone = productsClone.filter(item => {
				return item._id !== product._id;
			});
			setProducts(productsClone);
		});
	};

	return (
		<Base title="Cart" description="your items in cart">
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
					<div className="col-5">Order Details</div>
				</div>
			)}
		</Base>
	);
};

export default Cart;
