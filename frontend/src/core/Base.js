import React from "react";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "Description",
	children,
	className = "bg-dark text-white p-4"
}) => {
	return (
		<div>
			<Menu />
			<div className="container-fluid">
				<div className="my-3 bg-dark text-white text-center">
					<h3 className="display-4">{title}</h3>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer text-white text-center  py-3">
				<div className="container-fluid bg-success py-3">
					<h5>If you got any questions, feel free to reach out!!!</h5>
					<button className="btn btn-warning">Contact Us</button>
				</div>
				<div className="container">
					<span className="text-muted">
						Keep up with <span className="text-white">Fashion</span>
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Base;
