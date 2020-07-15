const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { uuid } = require("uuidv4");
const { createOrder } = require("./order");
const { pushOrderInPurchaseList } = require("./user");
const { updateStockAndSold } = require("./product");

exports.makePaymentByStripe = (req, res) => {
	let { token, products } = req.body;
	let productsInCart = [];
	const amount = products.reduce((total, product) => {
		return total + product.price;
	}, 0);
	const idempotencyKey = uuid();
	const refundIdempotencyKey = uuid();

	stripe.customers
		.create({
			email: token.email,
			source: token.id
		})
		.then(customer => {
			// console.log({ customer });
			stripe.charges
				.create(
					{
						amount: amount * 100,
						currency: "INR",
						customer: customer.id,
						receipt_email: token.email,
						description: "Payment Successful!",
						shipping: {
							name: token.card.name,
							address: {
								line1: token.card.address_line1,
								line2: token.card.address_line2,
								city: token.card.address_city,
								country: token.card.address_country,
								postal_code: token.card.address_zip
							}
						}
					},
					{
						idempotencyKey
					},
					(stripeErr, stripeRes) => {
						if (stripeErr) {
							res.status(500).send({ error: stripeErr });
						} else {
							// res.status(200).send({ success: stripeRes });
							req.body.order = {
								products: products,
								address: `
							    ${stripeRes.billing_details.name},
							    ${stripeRes.billing_details.address.line1},
							    ${stripeRes.billing_details.address.city},
							    ${stripeRes.billing_details.address.postal_code},
							    ${stripeRes.billing_details.address.country}
							    `,
								amount: amount,
								transactionId: stripeRes.id
							};
							req.body.success = stripeRes;
							const refund = () => {
								stripe.refunds.create(
									{ charge: stripeRes.id },
									{
										idempotencyKey: refundIdempotencyKey
									},
									(refundErr, refundSuccess) => {
										if (refundErr) {
											console.log({ refundErr });
										} else {
											console.log({ refundSuccess });
										}
										// if (refundErr) {
										// 	res.status(500).send({ error: refundErr });
										// } else {
										// 	res.status(200).send({ success: refundSuccess });
										// }
									}
								);
							};

							updateStockAndSold(
								req,
								res,
								() => {
									pushOrderInPurchaseList(
										req,
										res,
										() => {
											createOrder(req, res, refund);
										},
										refund
									);
								},
								refund
							);
						}
					}
				)
				// .then(result => res.status(200).json(result))
				.catch(err => console.log(err));
		});
};
