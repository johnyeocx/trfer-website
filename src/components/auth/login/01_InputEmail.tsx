import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/Auth/Login.module.scss";
import GoogleSigninButton from "../register/SelectProvider/googleSigninButton";
import Margin from "@/components/general/margin";
import MyButton from "@/components/general/MyButton";
import AuthTextField from "../authTextField";
import { AuthService } from "@/services/authService";
import { LoginPage } from "@/pages/login";
import { useRouter } from "next/router";
import { Divider } from "../register/01_SelectProvider";
import { useDispatch, useSelector } from "react-redux";
import { AuthStatus, setAuthStatus, setPageLoading } from "@/redux/appSlice";
import { accessTokenKey, refreshTokenKey } from "@/misc/constants";
import { RootState } from "@/redux/store";
import { User, signOut } from "firebase/auth";
import { AuthErrFuncs } from "@/models/errors/authErrs";
import { auth } from "@/pages/_app";

type InputEmailProps = {
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;
	setPage: Dispatch<SetStateAction<LoginPage>>;
};

function InputEmail({ email, setEmail, setPage }: InputEmailProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	// const user = useSelector((state: RootState) => state.userState.user);
	const [errText, setErrText] = useState("");
	const [loading, setLoading] = useState(false);

	const loginClicked = async () => {
		setLoading(true);

		try {
			const res = await AuthService.login(email);
			console.log(res);
		} catch (error: any) {
			console.log("Failed to login: ", error);
			setLoading(false);
			return;
		}

		setLoading(false);
		setPage(LoginPage.verifyEmail);
	};

	const onTokenSuccess = async (user: User) => {
		try {
			const token = await user?.getIdToken();
			dispatch(setPageLoading(true));
			const { data } = await AuthService.externalLogin(token);
			localStorage.setItem(accessTokenKey, data.access_token);
			localStorage.setItem(refreshTokenKey, data.refresh_token);
			setAuthStatus(AuthStatus.loggedIn);
			router.push("/home");
		} catch (error: any) {
			dispatch(setPageLoading(false));
			await signOut(auth);
			if (error.response != null) {
				setErrText(
					AuthErrFuncs.getExtSigninErrText(
						error.response.status,
						error.response.data
					)
				);
			} else {
				setErrText("Failed to sign in. Please try again later");
			}

			return;
		}
	};

	return (
		<>
			<h1 className={styles.headerText}>Welcome back</h1>
			<Margin height={15} />
			<GoogleSigninButton
				setErrText={setErrText}
				onTokenSuccess={onTokenSuccess}
				text={"Login with Google"}
			/>

			<Divider />

			<AuthTextField
				placeholder="Email"
				type="text"
				value={email}
				onChange={(val) => setEmail(val)}
				// error={errors.emailErr}
			/>
			<Margin height={30} />
			<MyButton
				text="Login with email"
				loading={loading}
				onClick={loginClicked}
				// enabled={enabled}
			/>

			<Margin height={15} />
			<button
				className={styles.bottomText}
				onClick={() => router.push("/register")}
			>
				Don&apos;t have an account? <span>Register here</span>
			</button>
			{errText !== "" && (
				<>
					<Margin height={20} />
					<div className={styles.errText}>{errText}</div>
				</>
			)}
		</>
	);
}

export default InputEmail;
