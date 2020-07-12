import config from "./../../config";

export const getAllProducts = () => {
	return fetch(`${config.API}/product/`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.catch(console.error);
};

export const getProduct = productId => {
	return fetch(`${config.API}/product/${productId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.catch(console.error);
};

export const getProductPhoto = productId => {
	return fetch(`${config.API}/product/${productId}/photo`, {
		method: "GET"
	})
		.then(res => res.json())
		.catch(console.error);
};
