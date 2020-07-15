import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Base from "./../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		isLoading: false,
		didRedirect: false
	});

	const { email, password, error, isLoading, didRedirect } = values;
	const userobj = isAuthenticated();

	const handleChange = e => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	const onSubmit = e => {
		e.preventDefault();
		setValues({
			...values,
			isLoading: true
		});
		signin({ email, password }).then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error,
					isLoading: false
				});
			} else {
				authenticate(res, () => {
					setValues({
						...values,
						email: "",
						password: "",
						error: "",
						didRedirect: true,
						isLoading: false
					});
				});
			}
		});
		return false;
	};

	const alertLoading = () => (
		<div className="row" style={{ display: isLoading ? "" : "none" }}>
			<div className="col-md-6 mx-auto">
				<div className="alert alert-info">Loading....</div>
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

	const signinForm = () => (
		<div className="row">
			<div className="col-md-6 mx-auto">
				<form onSubmit={onSubmit}>
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
						value="SIGN IN"
					/>
				</form>
			</div>
		</div>
	);

	const performRedirect = () => {
		if (userobj && didRedirect) {
			if (userobj?.user?.role === 1) {
				// redirect to admin
				return <Redirect to="/admin/dashboard" />;
			} else {
				// redirect to user
				return <Redirect to="/" />;
			}
		}
		if (userobj) {
			return <Redirect to="/" />;
		}
	};

	return (
		<Base title="Sign In" description="Find your style!">
			{alertLoading()}
			{alertFailure()}
			{signinForm()}
			{performRedirect()}
		</Base>
	);
};

export default Signin;
