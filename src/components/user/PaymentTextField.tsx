import React, { useEffect } from "react";
import styles from "../../styles/Payment/PaymentTextField.module.scss";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";

type PaymentTextFieldProps = {
	placeholder: string;
	value: string;
	onChange: (val: string) => void;
	title: string;
	error?: boolean;
	scale?: number;
	bgColor?: string;
	placeholderColor?: string;
	textColor?: string;
	preset?: string | null;
};
function PaymentTextField({
	placeholder,
	value,
	onChange,
	error,
	scale,
	title,
	preset,
}: PaymentTextFieldProps) {
	const width = () => {
		if (!scale) return null;
		return ((1 - scale) / scale) * 100 + 100;
	};
	return (
		<>
			<p className={styles.inputTitle}>{title}</p>
			<div
				className={`${styles.container} ${error && styles.errContainer} ${
					preset != null && styles.presetContainer
				}`}
			>
				<input
					placeholder={placeholder}
					type="text"
					className={styles.input}
					value={value}
					disabled={preset != null}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
		</>
	);
}

export default PaymentTextField;
