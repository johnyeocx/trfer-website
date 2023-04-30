import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home/HomeTextField.module.scss";

type HomeTextFieldProps = {
	// placeholder: string;
	value: string;
	onChange: (val: string) => void;
	error?: boolean;
};
function HomeTextField({ value, onChange }: HomeTextFieldProps) {
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

export default HomeTextField;
