import React, { useEffect, useState } from "react";
import styles from "../styles/Auth/Register.module.scss";
import AuthTextField from "@/components/auth/authTextField";
import Margin from "@/components/general/margin";
import MyButton from "@/components/general/MyButton";

import Logo from "../../public/logo.svg";
import SelectProvider from "@/components/auth/register/01_SelectProvider";
import InputDetails from "@/components/auth/register/03_InputDetails";
import VerifyEmail from "@/components/auth/register/02_VerifyEmail";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import ConnectBank from "@/components/auth/register/04_ConnectBank";
import { AuthService } from "@/services/authService";
import { AuthErrFuncs } from "@/models/errors/authErrs";
import { accessTokenKey, refreshTokenKey } from "@/misc/constants";

export enum RegPage {
	selectProvider,
	verifyEmail,
	inputDetails,
	connectBank,
}

export type RegDetails = {
	username: string;
	email: string;
};

function Register() {
	const router = useRouter();
	const [page, setPage] = useState<RegPage>(RegPage.selectProvider);
	const [details, setDetails] = useState<RegDetails>({
		username: "",
		email: "",
	});

	useEffect(() => {
		if (window === undefined) return;
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const username = urlParams.get("username");

		if (username !== null) setDetails({ ...details, username });
	}, []);

	const [verifyErrText, setVerifyErrText] = useState<string>("");

	const onVerifyClicked = async (latestOTP: string) => {
		try {
			const { data } = await AuthService.verifyEmailRegister({
				email: details.email,
				otp: latestOTP,
			});

			localStorage.setItem(accessTokenKey, data.access_token);
			localStorage.setItem(refreshTokenKey, data.refresh_token);
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
				{/* <InputDetails
					details={details}
					setDetails={setDetails}
					setPage={setPage}
				/> */}
				{page === RegPage.selectProvider ? (
					<SelectProvider
						setPage={setPage}
						details={details}
						setDetails={setDetails}
					/>
				) : page === RegPage.verifyEmail ? (
					<VerifyEmail
						onVerifyClicked={onVerifyClicked}
						errText={verifyErrText}
					/>
				) : null}
			</div>
		</div>
	);
}

export default Register;
