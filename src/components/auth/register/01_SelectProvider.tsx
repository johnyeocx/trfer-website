import Margin from "@/components/general/margin";
import React, { Dispatch, SetStateAction, useState } from "react";

import { Divider } from "../login";

import styles from "../../../styles/Auth/Register.module.scss";
import GoogleSigninButton from "./SelectProvider/googleSigninButton";
import { RegDetails, RegPage } from "@/pages/register";

import Logo from "../../../../public/logo.svg";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setShowLoginModal } from "@/redux/appSlice";
import HomeTextField from "@/components/home/HomeTextField";
import AuthTextField from "../authTextField";
import { UserService } from "@/services/userService";

type SelectProviderProps = {
	details: RegDetails;
	setDetails: Dispatch<SetStateAction<RegDetails>>;
	setPage: Dispatch<SetStateAction<RegPage>>;
};

function SelectProvider({ details, setDetails, setPage }: SelectProviderProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const [errText, setErrText] = useState<string>("");
	const [loading, setLoading] = useState(false);

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

	const isEnabled = () => {
		return details.username.length > 0 && details.email.length > 0;
	};

	return (
		<>
			<div className={styles.logoContainer}>
				{/* <Logo /> */}
				<h1>trf.</h1>
			</div>
			<h1 className={styles.selectProviderHeader}>
				Let's get your payment link up.{" "}
			</h1>
			<Margin height={20} />
			<HomeTextField
				value={details.username}
				onChange={(username) => setDetails({ ...details, username })}
			/>
			<Margin height={25} />
			<GoogleSigninButton setErrText={setErrText} />

			<Divider />

			<AuthTextField
				type="text"
				placeholder="Email"
				value={details.email}
				onChange={(email) => setDetails({ ...details, email })}
			/>
			<Margin height={25} />

			<button
				className={styles.selectCreateContainer}
				onClick={() => nextClicked()}
			>
				<p>Sign up with email</p>
			</button>
			<Margin height={15} />
			<button className={styles.bottomText} onClick={() => navToLogin()}>
				Already have an account? <span>Sign in here</span>
			</button>
			{/* 
			{errText !== "" && (
				<>
					<Margin height={20} />
					<div className={loginStyles.errText}>{errText}</div>
				</>
			)} */}
		</>
	);
}

export default SelectProvider;
