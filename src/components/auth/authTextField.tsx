import React, { useEffect } from "react";
import styles from "../../styles/Auth/AuthTextField.module.scss";

type AuthTextFieldProps = {
	placeholder: string;
	type: string;
	value: string;
	onChange: (val: string) => void;
	error?: boolean;
	borderWidth?: number;
};
function AuthTextField({
	placeholder,
	type,
	value,
	onChange,
	error,
	borderWidth,
}: AuthTextFieldProps) {
	return (
		<div
			style={borderWidth != null ? { borderWidth: `${borderWidth}px` } : {}}
			className={`${styles.container} ${error && styles.errContainer}`}
		>
			<label className={styles.inputContainer}>
				<input
					type={type}
					className={`${styles.field} ${
						type === "password" && styles.passwordField
					}`}
					placeholder=" "
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<span className={styles.label}>{placeholder}</span>
			</label>
		</div>
	);
}

export default AuthTextField;