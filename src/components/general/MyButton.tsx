import React from "react";
import styles from "../../styles/General/MyButton.module.scss";

type MyButtonProps = {
	text: string;
	loading?: boolean;
	onClick: () => void;
	enabled?: boolean;
};
function MyButton({ text, loading, onClick, enabled = true }: MyButtonProps) {
	return (
		<button
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
