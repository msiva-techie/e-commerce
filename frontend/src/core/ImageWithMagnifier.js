import React from "react";
import ReactImageMagnify from "react-image-magnify";
import config from "./../config";

const ImageWithMagnifier = ({ productId }) => {
	return (
		<ReactImageMagnify
			{...{
				smallImage: {
					alt: "Wristwatch by Ted Baker London",
					isFluidWidth: true,
					src: `${config.API}/product/${productId}/photo`
				},
				largeImage: {
					src: `${config.API}/product/${productId}/photo`,
					width: 1200,
					height: 1800
				},
				enlargedImageContainerStyle: { zIndex: 9 }
			}}
		/>
	);
};

export default ImageWithMagnifier;
