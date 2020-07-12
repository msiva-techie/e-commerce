import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "./../core/Base";
import { signup } from "../auth/helper";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false,
		isLoading: false
	});

	const { name, email, password, success, error } = values;

	const handleChange = e => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	const onSubmit = e => {
		e.preventDefault();
		signup({ name, email, password }).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error,
					success: false
				});
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					error: "",
					success: true
				});
			}
		});
		return false;
	};

	const alertSuccess = () => (
		<div className="row" style={{ display: success ? "" : "none" }}>
			<div className="col-md-6 mx-auto">
				<div className="alert alert-success">
					Your account has been created successfully!.
					<Link to="/signin"> Login</Link>
				</div>
			</div>
		</div>
	);

	const alertFailure = () => (
		<div className="row" style={{ display: error ? "" : "none" }}>
			<div className="col-md-6 mx-auto">
				<div className="alert alert-danger">{error}</div>
			</div>
		</div>
	);

	const signupForm = () => (
		<div className="row">
			<div className="col-md-6 mx-auto">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							name="name"
							onChange={handleChange}
							value={name}
							className="form-control"
							required
						/>
					</div>
					<div className="form-group">
						<label>E-mail</label>
						<input
							type="email"
							name="email"
							onChange={handleChange}
							value={email}
							className="form-control"
							required
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							name="password"
							onChange={handleChange}
							value={password}
							className="form-control"
							required
						/>
					</div>
					<input
						type="submit"
						className="btn btn-success btn-block"
						value="SIGN UP"
					/>
				</form>
			</div>
		</div>
	);
	return (
		<Base title="Sign Up" description="Find your style!">
			{alertSuccess()}
			{alertFailure()}
			{signupForm()}
		</Base>
	);
};

export default Signup;
