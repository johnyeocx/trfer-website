import React, { useEffect } from "react";
import styles from "../../styles/User/NoteTextField.module.scss";

type NoteTextFieldProps = {
	placeholder: string;
	value: string;
	onChange: (val: string) => void;
	error?: boolean;
};
function NoteTextField({
	placeholder,
	value,
	onChange,
	error,
}: NoteTextFieldProps) {
	return (
		<div className={`${styles.container} ${error && styles.errContainer}`}>
			<label className={styles.inputContainer}>
				<input
					type="text"
					className={`${styles.field}`}
					placeholder=" "
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<span className={styles.label}>{placeholder}</span>
			</label>
		</div>
	);
}

export default NoteTextField;
