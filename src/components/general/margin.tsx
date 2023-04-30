import React from "react";

type MarginProps = {
	width?: number;
	height?: number;
};

function Margin({ width, height }: MarginProps) {
	return (
		<div
			style={{
				width: width,
				height: height,
			}}
		></div>
	);
}

export default Margin;
