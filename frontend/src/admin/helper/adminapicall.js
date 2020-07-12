import config from "./../../config";

// Product APIs

export const createProduct = (token, userId, product) => {
	console.log("product...", product);
	return fetch(`${config.API}/product/userId/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: product
	})
		.then(res => res.json())
		.catch(err => console.error(err));
};

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

export const updateProduct = (token, productId, userId, formData) => {
	return fetch(`${config.API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: formData
	})
		.then(res => res.json())
		.catch(console.error);
};

export const deleteProduct = (token, productId, userId) => {
	return fetch(`${config.API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.catch(console.error);
};

// Category APIs

export const createCategory = (token, userId, category) => {
	console.log("token.....", token);
	return fetch(`${config.API}/category/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(category)
	})
		.then(res => res.json())
		.catch(console.error);
};

export const getAllCategories = () => {
	return fetch(`${config.API}/category/`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.catch(console.error);
};

export const getCategory = categoryId => {
	return fetch(`${config.API}/category/${categoryId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.catch(console.error);
};

export const updateCategory = (token, categoryId, userId, category) => {
	return fetch(`${config.API}/category/${categoryId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(category)
	})
		.then(res => res.json())
		.catch(console.error);
};

export const deleteCategory = (token, categoryId, userId) => {
	return fetch(`${config.API}/category/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.catch(console.error);
};
