import config from "../../config";

export const signup = data => {
	return fetch(`${config.API}/auth/signup`, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.catch(console.error);
};

export const signin = data => {
	return fetch(`${config.API}/auth/signin`, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.catch(console.error);
};

export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

export const isAuthenticated = () => {
	if (typeof window === "undefined") {
		return false;
	} else if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};

export const signout = next => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
		fetch(`${config.API}/auth/signout`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST"
		})
			.then(res => res.json())
			.catch(console.error);
		next();
	}
};
