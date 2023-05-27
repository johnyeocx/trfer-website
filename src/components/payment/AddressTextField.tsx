import React from "react";
import styles from "../../styles/Payment/PaymentTextField.module.scss";
import aStyles from "../../styles/Payment/AddressTextField.module.scss";
import PaymentTextField from "../user/PaymentTextField";
import Margin from "../general/margin";

function AddressTextField({ error }: any) {
	return (
		<div>
			<p className={styles.inputTitle}>Address</p>
			<div
				className={`${aStyles.addContainer} ${styles.container} ${
					error && styles.errContainer
				}`}
			>
				<input
					type="text"
					className={`${styles.input} ${aStyles.addInput}`}
					placeholder="Address Line 1"
				/>
				<input
					type="text"
					className={`${styles.input} ${aStyles.addInput}`}
					placeholder="Address Line 2"
				/>
				<input
					type="text"
					className={`${styles.input} ${aStyles.addInput}`}
					placeholder="City"
				/>
				<input
					type="text"
					className={`${styles.input} ${aStyles.addInput}`}
					placeholder="Postal Code"
				/>
			</div>
		</div>
	);
}

export default AddressTextField;
