import React from "react";
import styles from "../../styles/Home/HomeButton.module.scss";

type MyButtonProps = {
	text: string;
	loading?: boolean;
	onClick: () => void;
	enabled?: boolean;
};

function HomeButton({ text, loading, onClick, enabled = true }: MyButtonProps) {
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

export default HomeButton;
