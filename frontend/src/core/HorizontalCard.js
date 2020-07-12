import React from "react";
import testImg from "./../test.jpg";
import config from "./../config";
import { Link } from "react-router-dom";

const Card = ({ product, popFromCart }) => {
	return (
		<div
			className="card mb-3 bg-dark text-white border border-light"
			style={{ width: "40rem" }}
		>
			<div className="row no-gutters">
				<div className="col-md-4">
					{!product?._id && (
						<Link
							to={`/product/${product._id}`}
							className="text-white"
							style={{ textDecoration: "none" }}
						>
							<img
								src={testImg}
								className="card-img"
								alt="..."
								style={{ maxHeight: "100%", maxWidth: "100%" }}
							/>
						</Link>
					)}
					{product?._id && (
						<Link
							to={`/product/${product._id}`}
							className="text-white"
							style={{ textDecoration: "none" }}
						>
							<img
								src={`${config.API}/product/${product._id}/photo`}
								className="card-img"
								alt="..."
								style={{ maxHeight: "100%", maxWidth: "100%" }}
							/>
						</Link>
					)}
				</div>
				<div className="col-md-8">
					<div className="card-body">
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
							<h4>
								<p className="card-text badge badge-primary">
									{product.price} <i className="fa fa-inr"></i>
								</p>
							</h4>
						</Link>
						<button
							// to="/user/dashboard"
							className="btn btn-danger btn-block mt-3"
							onClick={() => {
								popFromCart(product);
							}}
						>
							Remove from cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
