import React, { useState } from "react";
import styles from "../../styles/User/AmountTextField.module.scss";

type AmountTextFieldProps = {
	value: string;
	onChange: (val: string) => void;
	error?: boolean;
	height?: number;
	scale?: number;
	bgColor?: string;
	placeholderColor?: string;
	textColor?: string;
};
function AuthTextField({
	value,
	onChange,
	error,
	scale,
	bgColor = "#FAFAFA",
	placeholderColor = "#8F8F8F",
	textColor = "black",
}: AmountTextFieldProps) {
	const [focused, setFocused] = useState(false);

	const width = () => {
		if (!scale) return null;
		return ((1 - scale) / scale) * 100 + 100;
	};
	return (
		<div
			className={`${styles.container} ${error && styles.errContainer}`}
			style={{
				transformOrigin: "left",
				transform: `scale(${scale})`,
				width: `${width()}%`,
				backgroundColor: bgColor,
			}}
		>
			<label className={styles.inputContainer}>
				<div
					style={
						!focused && value.length === 0
							? { display: "none" }
							: { color: textColor }
					}
					className={styles.prefix}
				>
					£
				</div>
				<div
					className={styles.suffix}
					style={
						!focused && value.length === 0
							? { display: "none" }
							: {
									color: textColor,
							  }
					}
				>
					GBP
				</div>
				<input
					type="number"
					step="0.01"
					className={`${styles.field}`}
					placeholder=" "
					value={value}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					style={{
						color: textColor,
					}}
					onChange={(e) => {
						let val = e.target.value;
						let decIndex = value.indexOf(".");
						if (decIndex !== -1 && val.length > decIndex + 3) {
							onChange(val.substring(0, decIndex + 3));
						} else {
							onChange(val);
						}
					}}
				/>

				<span
					className={styles.label}
					style={{
						color: placeholderColor,
					}}
				>
					Amount
				</span>
			</label>
		</div>
	);
}

export default AuthTextField;
