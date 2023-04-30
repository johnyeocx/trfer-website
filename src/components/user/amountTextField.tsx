import React, { useState } from "react";
import styles from "../../styles/User/AmountTextField.module.scss";

type AmountTextFieldProps = {
	value: string;
	onChange: (val: string) => void;
	error?: boolean;
};
function AuthTextField({ value, onChange, error }: AmountTextFieldProps) {
	const [focused, setFocused] = useState(false);
	return (
		<div className={`${styles.container} ${error && styles.errContainer}`}>
			<label className={styles.inputContainer}>
				{/* <div className={styles.fieldContainer}> */}

				<div
					style={!focused && value.length === 0 ? { display: "none" } : {}}
					className={styles.prefix}
				>
					£
				</div>
				<div
					style={!focused && value.length === 0 ? { display: "none" } : {}}
					className={styles.suffix}
				>
					GBP
				</div>
				<input
					type="number"
					step=".01"
					className={`${styles.field}`}
					placeholder=" "
					value={value}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					onChange={(e) => onChange(e.target.value)}
				/>

				<span className={styles.label}>Amount</span>
			</label>
		</div>
	);
}

export default AuthTextField;
