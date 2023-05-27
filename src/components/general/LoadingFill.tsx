import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import styles from "../../styles/General/LoadingIndicator.module.scss";

function LoadingFill() {
	return (
		<div className={styles.loadingFillContainer}>
			<LoadingIndicator spinnerDim={60} />
		</div>
	);
}

export default LoadingFill;
