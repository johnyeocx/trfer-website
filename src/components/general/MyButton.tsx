import React from "react";
import styles from "../../styles/General/MyButton.module.scss";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";

type MyButtonProps = {
	text: string;
	loading?: boolean;
	onClick: () => void;
	enabled?: boolean;
	scale?: number;
	bgColor?: string;
	textColor?: string;
	width?: string;
};
function MyButton({
	text,
	loading,
	onClick,
	enabled = true,
	scale,
	bgColor,
	textColor = "white",
	width = "100%",
}: MyButtonProps) {
	return (
		<button
			className={`${styles.buttonContainer} ${
				enabled !== null && !enabled && styles.disabledContainer
			}`}
			style={{
				transformOrigin: "left",
				transform: scale != null ? `scale(${scale})` : "1",
				width: scale != null ? `${GenFuncs.scaledWidth(scale!)}%` : width,
				// width: width,
				backgroundColor: bgColor != null ? bgColor : "#111",
				color: textColor,
			}}
			onClick={() => {
				if (!loading && enabled) onClick();
			}}
		>
			{loading ? <div className={styles.spinner}></div> : <>{text}</>}
		</button>
	);
}

export default MyButton;
