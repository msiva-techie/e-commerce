import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {
	const [values, setValues] = useState({
		error: "",
		products: []
	});

	const { products, error } = values;

	useEffect(() => {
		getAllProducts().then(res => {
			if (res.error) {
				setValues({
					...values,
					error: res.error
				});
			} else {
				setValues({
					...values,
					products: res
				});
			}
		});
	}, []);

	return (
		<Base
			title="Fashion Store"
			description="Pick your fashion"
			// className="text-center text-white"
		>
			<div className="row ml-4">
				{products.map((product, index) => (
					<div className="m-4" key={index}>
						<Card product={product} />
					</div>
				))}
			</div>
		</Base>
	);
};

export default Home;
