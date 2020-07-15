export const addToCart = (product, next) => {
	let cart = [];
	if (typeof window !== "undefined") {
		cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			const isExists = cart.some(item => item._id === product._id);
			if (!isExists) {
				cart = [...cart, product];
			}
		} else {
			cart = [product];
		}
		next();
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	return cart;
};

export const removeFromCart = (product, next) => {
	let cart = [];
	if (typeof window !== "undefined") {
		cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			cart = cart.filter(item => {
				return item._id !== product._id;
			});
			next();
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}
	return cart;
};

export const emptyCart = next => {
	if (typeof window !== "undefined") {
		localStorage.setItem("cart", JSON.stringify([]));
		next();
	}
};
