import React from "react";
import LoadingIndicator from "./LoadingIndicator";

export type LoadingPageProps = {
	bgColor?: string;
};
function LoadingPage({ bgColor = "white" }: LoadingPageProps) {
	return (
		<div
			style={{
				position: "absolute",
				left: "0px",
				top: "0px",
				backgroundColor: bgColor,
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 10,
			}}
		>
			<LoadingIndicator />
		</div>
	);
}

export default LoadingPage;
