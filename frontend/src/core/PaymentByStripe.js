import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { isAuthenticated } from "../auth/helper";
import config from "./../config";
import { makePaymentByStripe } from "./helper/coreapicalls";
import { emptyCart } from "./helper/utils";
import { withRouter } from "react-router-dom";

const PaymentByStripe = ({ products, values, setValues, history }) => {
	const { user, token } = isAuthenticated();

	const getAmount = () => {
		return products.reduce((total, product) => {
			return total + product.price;
		}, 0);
	};

	const makePayment = stripeToken => {
		console.log({ stripeToken });

		makePaymentByStripe(stripeToken, products, token, user._id).then(res => {
			if (res.success) {
				setValues({
					...values,
					loading: false,
					error: "",
					success: true
				});
				emptyCart(() => {
					setTimeout(() => {
						history.push("/");
					}, 5000);
				});
			} else if (res.error) {
				setValues({
					...values,
					loading: false,
					success: false,
					error: "Payment Failed!"
				});
			}
		});
	};

	return (
		<StripeCheckout
			token={makePayment}
			stripeKey={config.stripePublicKey}
			name="Fashion Store"
			description="Make your payment"
			amount={getAmount() * 100}
			currency="INR"
			email={user.email}
			shippingAddress
			billingAddress
		>
			<button
				className="btn btn-success btn-block"
				onClick={() => {
					setValues({
						...values,
						loading: true
					});
				}}
			>
				Pay with stripe
			</button>
		</StripeCheckout>
	);
};

export default withRouter(PaymentByStripe);
