import React from "react";
import config from "./../config";

const ImageHelper = ({ productId }) => {
	return (
		<img
			id="myimage"
			src={`${config.API}/product/${productId}/photo`}
			className="card-img-top"
			alt="product"
			style={{
				maxHeight: "100%",
				maxWidth: "100%"
			}}
		/>
	);
};

export default ImageHelper;
