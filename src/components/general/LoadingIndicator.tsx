import React from "react";
import styles from "../../styles/General/LoadingIndicator.module.scss";

function LoadingIndicator() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<div className={styles.spinner}></div>{" "}
		</div>
	);
}

export default LoadingIndicator;
