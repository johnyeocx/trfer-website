import React, { useState } from "react";
import styles from "../styles/Auth/Login.module.scss";
import InputEmail from "@/components/auth/login/01_InputEmail";
import VerifyEmail from "@/components/auth/register/02_VerifyEmail";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";
import { AuthErrFuncs } from "@/models/errors/authErrs";
import { accessTokenKey, refreshTokenKey } from "@/misc/constants";
import NavBar from "@/components/general/Nav/NavBar";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import LoadingPage from "@/components/general/LoadingPage";
import { AuthStatus, setAuthStatus } from "@/redux/appSlice";

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
	const pageLoading = useSelector((state: RootState) => state.app.loading);
	const [email, setEmail] = useState("");
	const [page, setPage] = useState(LoginPage.selectProvider);
	const [verifyErrText, setVerifyErrText] = useState("");

	const onVerifyClicked = async (latestOtp: string) => {
		try {
			const { data } = await AuthService.verifyEmailLogin({
				email: email,
				otp: latestOtp,
			});

			localStorage.setItem(accessTokenKey, data.access_token);
			localStorage.setItem(refreshTokenKey, data.refresh_token);
			setAuthStatus(AuthStatus.loggedIn);
		} catch (error: any) {
			console.log("Failed to verify email");
			setVerifyErrText(AuthErrFuncs.getVerifyReqErrText(error.response.status));
			return;
		}

		router.push("/home");
	};

	return (
		<>
			{pageLoading && <LoadingPage bgColor="rgba(20, 20, 20, 0.5)" />}
			<NavBar showRight={false} />
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
		</>
	);
}

export default Login;
