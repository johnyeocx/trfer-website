import React from "react";
import styles from "../../styles/General/LoadingIndicator.module.scss";

type LoadingIndicatorProps = {
	width?: string;
	borderWidth?: string;
	spinnerDim?: number;
};
function LoadingIndicator({
	width,
	spinnerDim,
	borderWidth,
}: LoadingIndicatorProps) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				width: width ? width : "100%",
				backgroundColor: "transparent",
			}}
		>
			<div
				style={{
					width: spinnerDim ? `${spinnerDim}px` : "30px",
					height: spinnerDim ? `${spinnerDim}px` : "30px",
					borderRadius: spinnerDim ? `${spinnerDim / 2}px` : "15px",
					borderWidth: borderWidth ? borderWidth : "4px",
				}}
				className={styles.spinner}
			></div>{" "}
		</div>
	);
}

export default LoadingIndicator;
