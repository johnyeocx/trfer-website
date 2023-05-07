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
};
function MyButton({
	text,
	loading,
	onClick,
	enabled = true,
	scale = 1,
	bgColor = "black",
	textColor = "white",
}: MyButtonProps) {
	return (
		<button
			style={{
				transformOrigin: "left",
				transform: `scale(${scale})`,
				width: `${GenFuncs.scaledWidth(scale!)}%`,
				backgroundColor: bgColor,
				color: textColor,
			}}
			className={`${styles.buttonContainer} ${
				enabled !== null && !enabled && styles.disabledContainer
			}`}
			onClick={() => {
				if (!loading && enabled) onClick();
			}}
		>
			{loading ? <div className={styles.spinner}></div> : <>{text}</>}
		</button>
	);
}

export default MyButton;
