import React, { useEffect } from "react";
import styles from "../../styles/User/NoteTextField.module.scss";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";

type NoteTextFieldProps = {
	placeholder: string;
	value: string;
	onChange: (val: string) => void;
	error?: boolean;
	scale?: number;
	bgColor?: string;
	placeholderColor?: string;
	textColor?: string;
};
function NoteTextField({
	placeholder,
	value,
	onChange,
	error,
	scale,
	bgColor = "#FAFAFA",
	placeholderColor = "#8F8F8F",
	textColor = "black",
}: NoteTextFieldProps) {
	return (
		<div
			style={{
				transformOrigin: "left",
				transform: `scale(${scale})`,
				width: `${GenFuncs.scaledWidth(scale!)}%`,
				backgroundColor: bgColor,
			}}
			className={`${styles.container} ${error && styles.errContainer}`}
		>
			<label className={styles.inputContainer}>
				<input
					type="text"
					className={`${styles.field}`}
					placeholder=" "
					value={value}
					onChange={(e) => onChange(e.target.value)}
					style={{ color: textColor }}
				/>
				<span className={styles.label} style={{ color: placeholderColor }}>
					{placeholder}
				</span>
			</label>
		</div>
	);
}

export default NoteTextField;
