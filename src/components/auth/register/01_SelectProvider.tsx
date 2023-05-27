import Margin from "@/components/general/margin";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "../../../styles/Auth/Register.module.scss";
import GoogleSigninButton from "./SelectProvider/googleSigninButton";
import { RegDetails, RegPage } from "@/pages/register";

import Logo from "../../../../public/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
	AuthStatus,
	setAuthStatus,
	setPageLoading,
	setShowLoginModal,
} from "@/redux/appSlice";

import AuthTextField from "../authTextField";
import { UserService } from "@/services/userService";
import MyButton from "@/components/general/MyButton";
import UsernameTextField from "./SelectProvider/UsernameTextField";
import { RootState } from "@/redux/store";
import LoadingPage from "@/components/general/LoadingPage";
import { User, signOut } from "firebase/auth";
import { AuthService } from "@/services/authService";
import { accessTokenKey, refreshTokenKey } from "@/misc/constants";
import { auth } from "@/pages/_app";
import { AuthErrFuncs } from "@/models/errors/authErrs";

type SelectProviderProps = {
	details: RegDetails;
	setDetails: Dispatch<SetStateAction<RegDetails>>;
	setPage: Dispatch<SetStateAction<RegPage>>;
};

export const Divider = () => {
	return (
		<div className={styles.divider}>
			<div className={styles.line} />
			<p>or</p>
			<div className={styles.line} />
		</div>
	);
};

function SelectProvider({ details, setDetails, setPage }: SelectProviderProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const pageLoading = useSelector((state: RootState) => state.app.loading);
	const [errText, setErrText] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [enabled, setEnabled] = useState(false);
	const [extEnabled, setExtEnabled] = useState(false);

	const nextClicked = async () => {
		// setPage(RegPage.verifyEmail);
		if (!isEnabled) return;

		setLoading(true);

		try {
			await UserService.emailRegister(details.username, details.email);
		} catch (error) {
			console.log("Failed: ", error);
			setLoading(false);
			return;
		}

		setPage(RegPage.verifyEmail);
		setLoading(false);
	};

	const navToLogin = () => {
		dispatch(setShowLoginModal(true));
		router.push("/login");
	};

	const isEnabled = (newDetails: any) => {
		return details.username.length > 0 && details.email.length > 0;
	};

	const isExtEnabled = (newDetails: any) => {
		return newDetails.username.length > 0;
	};

	const onTokenSuccess = async (user: User) => {
		try {
			const token = await user?.getIdToken();
			dispatch(setPageLoading(true));
			const { data } = await UserService.externalRegister(
				token,
				details.username
			);
			localStorage.setItem(accessTokenKey, data.access_token);
			localStorage.setItem(refreshTokenKey, data.refresh_token);
			dispatch(setAuthStatus(AuthStatus.loggedIn));
			router.push("/onboarding");
		} catch (error: any) {
			dispatch(setPageLoading(false));
			await signOut(auth);
			if (error.response != null) {
				let errorText = AuthErrFuncs.getExtRegisterErrText(
					error.response.status,
					error.response.data
				);
				console.log("Error:", errText);

				setErrText(errorText);
			} else {
				setErrText("Failed to sign in. Please try again later");
			}

			return;
		}
	};

	useEffect(() => {
		setEnabled(isExtEnabled(details));
	}, []);

	return (
		<>
			{pageLoading && <LoadingPage bgColor="rgba(20, 20, 20, 0.5)" />}
			<h1 className={styles.selectProviderHeader}>
				{/* Let&apos;s get your payment link up.{" "} */}
				Create your account
			</h1>
			<Margin height={10} />
			<UsernameTextField
				value={details.username}
				onChange={(username) => {
					setExtEnabled(isExtEnabled({ ...details, username }));
					setEnabled(isEnabled({ ...details, username }));
					setDetails({ ...details, username });
				}}
			/>
			<Margin height={25} />
			<GoogleSigninButton
				setErrText={setErrText}
				onTokenSuccess={onTokenSuccess}
				enabled={extEnabled}
				text="Sign up with Google"
			/>

			<Divider />

			<AuthTextField
				type="text"
				placeholder="Email"
				value={details.email}
				onChange={(email) => {
					setExtEnabled(isExtEnabled(details));
					setDetails({ ...details, email });
				}}
			/>
			<Margin height={25} />

			<MyButton
				onClick={nextClicked}
				text="Sign up with email"
				loading={loading}
				// enabled={enabled}
			/>
			<Margin height={15} />
			<button className={styles.bottomText} onClick={() => navToLogin()}>
				Already have an account? <span>Sign in here</span>
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

export default SelectProvider;
