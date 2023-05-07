import React, { useEffect, useRef, useState } from "react";
import styles from "../../../../styles/Auth/UsernameTextField.module.scss";

type UsernameTextFieldProps = {
	// placeholder: string;
	value: string;
	onChange: (val: string) => void;
	error?: boolean;
};
function UsernameTextField({ value, onChange }: UsernameTextFieldProps) {
	const [focused, setFocused] = useState(false);
	const onFocus = () => setFocused(true);
	const onBlur = () => setFocused(false);

	return (
		<div
			className={`${styles.inputContainer} ${focused && styles.inputFocused}`}
		>
			<p className={styles.prefixText}>trfer.me/</p>
			<input
				type="text"
				autoComplete="off"
				className={styles.inputField}
				placeholder="username"
				onFocus={onFocus}
				onBlur={onBlur}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}

export default UsernameTextField;
