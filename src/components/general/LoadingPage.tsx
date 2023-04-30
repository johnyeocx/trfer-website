import React from "react";
import LoadingIndicator from "./LoadingIndicator";

function LoadingPage() {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<LoadingIndicator />
		</div>
	);
}

export default LoadingPage;
