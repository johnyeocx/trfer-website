import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "../../../styles/Auth/Register.module.scss";
import loginStyles from "../../../styles/Auth/Login.module.scss";
import OtpInput from "react-otp-input";
import Margin from "@/components/general/margin";
import MyButton from "@/components/general/MyButton";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Countdown from "@/components/general/countdown";

type VerifyEmailProps = {
	onVerifyClicked: (latestOtp: string) => Promise<void>;
	errText: string;
};

export const RE_DIGIT = new RegExp(/^\d+$/);

function VerifyEmail({ onVerifyClicked, errText }: VerifyEmailProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [enabled, setEnabled] = useState<boolean>(false);
	const [otp, setOtp] = useState<string>("");

	const [canResend, setCanResend] = useState<boolean>(false);
	const countdownValue = 10;

	const onCountdownFinished = () => {
		setCanResend(true);
	};

	const onResendClicked = () => {
		setCanResend(false);
	};

	const nextClicked = async (latestOtp: string) => {
		setLoading(true);
		await onVerifyClicked(latestOtp);
		setLoading(false);
	};

	const isEnabled = (otp: string) => {
		for (let i = 0; i < otp.length; i++) {
			if (parseInt(otp[i]) === undefined) {
				console.log("Failed to parse: ", otp[i], "index: ", i);

				return false;
			}
		}

		return otp.length === 6;
	};

	const onChange = async (newOtp: string) => {
		setOtp(newOtp);
		setEnabled(isEnabled(newOtp));

		if (newOtp.length === 6 && isEnabled(newOtp)) {
			await nextClicked(newOtp);
		}
	};

	const getFutureDate = () => {
		const targetDate = new Date();
		targetDate.setSeconds(targetDate.getSeconds() + countdownValue);
		return targetDate;
	};

	return (
		<>
			{/* <button className={styles.backButton} onClick={() => onBackClicked()}>
				<FontAwesomeIcon icon={faArrowLeft} className={styles.logo} />
			</button> */}
			<h1 className={styles.headerText}>Verify your email</h1>
			<Margin height={5} />
			<p className={styles.descriptionText}>
				Please enter the 6 digit number emailed to you
			</p>

			<Margin height={20} />

			<div className={styles.otpGroup}>
				<OtpInput
					// className={styles.otpInput}
					renderInput={(props) => (
						<input {...props} className={styles.otpInput} />
					)}
					value={otp}
					onChange={onChange}
					// inputStyle="inputStyle"
					inputType="tel"
					numInputs={6}
				/>
			</div>

			<Margin height={25} />
			{canResend ? (
				<button
					className={`${styles.resendButton} ${styles.resendButtonActive}`}
					onClick={onResendClicked}
				>
					Resend the code now
				</button>
			) : (
				<button className={styles.resendButton}>
					Resend the code in{" "}
					<Countdown
						targetDate={getFutureDate()}
						onFinished={onCountdownFinished}
					/>
				</button>
			)}

			<Margin height={30} />
			{errText !== "" && <div className={loginStyles.errText}>{errText}</div>}
			<MyButton
				text="Verify"
				onClick={() => nextClicked(otp)}
				enabled={enabled}
				loading={loading}
			/>
		</>
	);
}

export default VerifyEmail;
