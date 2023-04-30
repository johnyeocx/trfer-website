import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/Auth/Login.module.scss";
import GoogleSigninButton from "../register/SelectProvider/googleSigninButton";
import Margin from "@/components/general/margin";
import MyButton from "@/components/general/MyButton";
import AuthTextField from "../authTextField";
import { Divider } from "../login";
import { AuthService } from "@/services/authService";
import { LoginPage } from "@/pages/login";
import { useRouter } from "next/router";

type InputEmailProps = {
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;
	setPage: Dispatch<SetStateAction<LoginPage>>;
};
function InputEmail({ email, setEmail, setPage }: InputEmailProps) {
	const router = useRouter();
	const [errText, setErrText] = useState("");
	const [loading, setLoading] = useState(false);

	const loginClicked = async () => {
		setLoading(true);
		try {
			const res = await AuthService.login(email);
			console.log(res);
		} catch (error: any) {
			console.log("Failed to login");
			setLoading(false);
			return;
		}

		setLoading(false);
		setPage(LoginPage.verifyEmail);
	};

	return (
		<>
			<div className={styles.logoContainer}>
				{/* <Logo /> */}
				<h1>trf.</h1>
			</div>

			<h1 className={styles.headerText}>Welcome back</h1>
			<Margin height={20} />
			<GoogleSigninButton setErrText={setErrText} />

			<Divider />

			<AuthTextField
				placeholder="Email"
				type="text"
				value={email}
				onChange={(val) => setEmail(val)}
				// error={errors.emailErr}
			/>
			<Margin height={30} />
			{errText !== "" && <div className={styles.errText}>{errText}</div>}
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
				Don't have an account? <span>Register here</span>
			</button>
		</>
	);
}

export default InputEmail;
