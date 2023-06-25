import React, { useState } from "react";
import styles from "../../styles/Landing/EmailInput.module.scss";
import LoadingIndicator from "../general/LoadingIndicator";
import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";

function EmailInput({ setSuccess, isDark }: any) {
	const [focused, setFocused] = useState(false);
	const [failed, setFailed] = useState(false);
	const [errText, setErrText] = useState("");
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");

	const submitClicked = async (email: string, setEmail: any) => {
		setFailed(false);

		if (email == "") {
			setErrText("Please provide an email");
			setFailed(true);
			setTimeout(() => {
				setFailed(false);
			}, 5000);
			return;
		}

		if (!GenFuncs.isEmailValid(email)) {
			setErrText("Invalid email provided");
			setFailed(true);
			setTimeout(() => {
				setFailed(false);
			}, 5000);
			return;
		}

		try {
			const response = await fetch("/api/submit", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
				}),
			});

			if (response.status != 200) throw "Failed";
			setSuccess(true);
			setEmail("");
			return;
		} catch (error) {
			console.log("failed to submit:", error);
			setFailed(true);
			setErrText("Something went wrong. Please try again later.");

			setTimeout(() => {
				setFailed(false);
			}, 5000);
		}
	};
	return (
		<>
			<div
				className={`${styles.inputContainer} ${
					focused && styles.focusedContainer
				} ${failed && styles.failedContainer} ${
					isDark && styles.darkContainer
				}`}
			>
				<input
					placeholder="Email"
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					onClick={async () => {
						setLoading(true);
						await submitClicked(email, setEmail);
						setLoading(false);
					}}
					className={styles.sendBtn}
				>
					{loading ? <LoadingIndicator /> : <>Sign Up</>}
				</button>
			</div>
			{failed && <p className={styles.failedTxt}>{errText}</p>}
		</>
	);
}

export default EmailInput;
