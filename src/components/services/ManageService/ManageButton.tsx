import React, { Dispatch, SetStateAction, useEffect } from "react";
import styles from "../../../styles/Services/ManageService/ManageButton.module.scss";
import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import Margin from "@/components/general/margin";

type ManageButtonProps = {
	onClick: () => Promise<void>;
	icon: IconDefinition;
	successIcon: IconDefinition;
	title: string;
	success: boolean;
	setSuccess: Dispatch<SetStateAction<boolean>>;
	loading: boolean;
	successText: string;
	bgColor?: string;
	secondary?: boolean;
};
function ManageButton({
	onClick,
	icon,
	title,
	success,
	setSuccess,
	loading,
	successIcon,
	successText,
	bgColor,
	secondary = false,
}: ManageButtonProps) {
	useEffect(() => {
		if (success) {
			setTimeout(() => setSuccess(false), 1500);
		}
	}, [success]);

	return (
		<button
			className={`${styles.iconContainer} ${
				success && styles.successContainer
			} ${secondary && styles.secondaryContainer}`}
			onClick={() => {
				if (!loading) onClick();
			}}
			// style={{
			// 	backgroundColor: bgColor == null ? "#111" : bgColor,
			// }}
		>
			{loading ? (
				<>
					<div>
						<LoadingIndicator spinnerDim={15} borderWidth="2px" />
					</div>
					<Margin width={8} />
				</>
			) : success ? (
				<FontAwesomeIcon className={styles.icon} icon={successIcon} />
			) : (
				<FontAwesomeIcon className={styles.icon} icon={icon} />
			)}

			<p className={styles.text}>{success ? successText : title}</p>
		</button>
	);
}

export default ManageButton;
