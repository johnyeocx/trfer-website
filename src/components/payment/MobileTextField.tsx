import React from "react";
import styles from "../../styles/Payment/PaymentTextField.module.scss";
import mStyles from "../../styles/Payment/MobileTextField.module.scss";
import PaymentTextField from "../user/PaymentTextField";
import Margin from "../general/margin";

function MobileTextField({
	error,
	mobileNumber,
	setMobileNumber,
	preset = null,
}: any) {
	return (
		<div className={mStyles.container}>
			<p className={styles.inputTitle}>Mobile Number</p>
			<div className={mStyles.mRow}>
				<div
					className={`${mStyles.ccContainer} ${styles.container} ${
						error && styles.errContainer
					} ${preset && styles.presetContainer}`}
				>
					<p className={mStyles.prefix}>+</p>
					<input
						type="text"
						className={styles.input}
						placeholder="44"
						value={mobileNumber.dialingCode}
						disabled={preset != null}
						onChange={(e) =>
							setMobileNumber({ ...mobileNumber, dialingCode: e.target.value })
						}
					/>
				</div>
				<Margin width={10} />
				<div
					className={`${mStyles.numberContainer} ${styles.container} ${
						error && styles.errContainer
					} ${preset && styles.presetContainer}`}
				>
					<input
						type="text"
						className={styles.input}
						placeholder="7000100200"
						value={mobileNumber.number}
						disabled={preset != null}
						onChange={(e) =>
							setMobileNumber({ ...mobileNumber, number: e.target.value })
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default MobileTextField;
