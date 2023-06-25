import React from "react";
import styles from "../../styles/Landing/SignedUpModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";

function SignedUpModal({ setSuccess }: any) {
	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<button onClick={() => setSuccess(false)}>
					<FontAwesomeIcon icon={faXmark} className={styles.icon} />
				</button>
				<h5>Thank you for your interest in byteclass!</h5>

				<p>
					We are working hard to bring this platform to you and will keep you
					updated about your access as we near our launch.
				</p>
			</div>
		</div>
	);
}

export default SignedUpModal;
