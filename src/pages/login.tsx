import React, { useState } from "react";
import styles from "../styles/Auth/Login.module.scss";
import { useDispatch } from "react-redux";
import { setShowLoginModal } from "@/redux/appSlice";
import InputEmail from "@/components/auth/login/01_InputEmail";
import VerifyEmail from "@/components/auth/register/02_VerifyEmail";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";
import { AuthErrFuncs } from "@/models/errors/authErrs";

export const Divider = () => {
	return (
		<div className={styles.divider}>
			<div className={styles.line} />
			<p>or</p>
			<div className={styles.line} />
		</div>
	);
};

export enum LoginPage {
	selectProvider,
	verifyEmail,
}

function Login() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [page, setPage] = useState(LoginPage.selectProvider);
	const [verifyErrText, setVerifyErrText] = useState("");

	const onVerifyClicked = async (latestOtp: string) => {
		try {
			const res = await AuthService.verifyEmailLogin({
				email: email,
				otp: latestOtp,
			});
			console.log(res);
		} catch (error: any) {
			console.log("Failed to verify email");
			setVerifyErrText(AuthErrFuncs.getVerifyReqErrText(error.response.status));
			return;
		}

		router.push("/home");
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.mainContainer}>
				{page == LoginPage.selectProvider ? (
					<InputEmail email={email} setEmail={setEmail} setPage={setPage} />
				) : (
					<VerifyEmail
						errText={verifyErrText}
						onVerifyClicked={onVerifyClicked}
					/>
				)}
			</div>
		</div>
	);
}

export default Login;
