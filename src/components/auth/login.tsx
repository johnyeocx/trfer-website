// import React, { useState } from "react";
// // import styles from "../../../styles/Auth/Login.module.scss";
// import styles from "../../styles/Auth/Login.module.scss";
// import AuthTextField from "@/components/auth/authTextField";
// import Margin from "@/components/general/margin";
// import MyButton from "@/components/general/MyButton";

// import Logo from "../../../public/logo.svg";
// import GoogleSigninButton from "@/components/auth/register/SelectProvider/googleSigninButton";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/pro-solid-svg-icons";
// import { useDispatch } from "react-redux";
// import { AuthStatus, setAuthStatus, setShowLoginModal } from "@/redux/appSlice";
// import { AuthService } from "@/services/authService";
// import { AuthErrFuncs, AuthErrs } from "@/models/errors/authErrs";
// import { useRouter } from "next/router";

// export const Divider = () => {
// 	return (
// 		<div className={styles.divider}>
// 			<div className={styles.line} />
// 			<p>or</p>
// 			<div className={styles.line} />
// 		</div>
// 	);
// };

// type LoginForm = {
// 	email: string;
// 	password: string;
// };
// function Login() {
// 	const dispatch = useDispatch();
// 	const router = useRouter();

// 	const [loading, setLoading] = useState<boolean>(false);
// 	const [enabled, setEnabled] = useState<boolean>(false);
// 	const [formDetails, setFormDetails] = useState<LoginForm>({
// 		email: "",
// 		password: "",
// 	});
// 	const [errText, setErrText] = useState<string>("");
// 	const [errors, setErrors] = useState<AuthErrs>(AuthErrFuncs.initAuthErrs());

// 	const closeModal = () => {
// 		dispatch(setShowLoginModal(false));
// 	};

// 	const loginClicked = async () => {
// 		setErrText("");
// 		setErrors(AuthErrFuncs.initAuthErrs());
// 		setLoading(true);

// 		// VALIDATION
// 		const { errors, errText } = AuthErrFuncs.checkEmailAndPassword(
// 			formDetails.email,
// 			formDetails.password
// 		);

// 		setErrText(errText);
// 		setErrors(errors);

// 		if (AuthErrFuncs.hasError(errors)) {
// 			setLoading(false);
// 			return;
// 		}

// 		try {
// 			await AuthService.login(formDetails);
// 		} catch (error: any) {
// 			setErrText(
// 				AuthErrFuncs.getLoginReqErrText(
// 					error.response.status,
// 					error.response.data
// 				)
// 			);
// 			setLoading(false);
// 			return;
// 		}

// 		try {
// 			await CusService.getCusData(dispatch);
// 			dispatch(setAuthStatus(AuthStatus.loggedIn));
// 		} catch (error) {
// 			console.log("Failed to get customer after login: ", error);
// 			setLoading(false);
// 			return;
// 		}
// 		setLoading(false);
// 		dispatch(setShowLoginModal(false));
// 	};

// 	const isEnabled = (formDetails: LoginForm) => {
// 		return formDetails.email.length > 0 && formDetails.password.length > 0;
// 	};

// 	const onTextChange = (key: string, val: string) => {
// 		const newFormDetails: LoginForm = { ...formDetails };
// 		newFormDetails[key as keyof LoginForm] = val;
// 		setFormDetails(newFormDetails);
// 		setEnabled(isEnabled(newFormDetails));
// 	};

// 	const navToRegister = () => {
// 		router.push("/register");
// 	};

// 	return (
// 		<div className={styles.pageContainer}>
// 			<div className={styles.mainContainer}>
// 				<button className={styles.closeButton} onClick={() => closeModal()}>
// 					<FontAwesomeIcon icon={faXmark} />
// 				</button>
// 				<div className={styles.logoContainer}>
// 					<Logo />
// 				</div>

// 				<h1 className={styles.headerText}>Welcome back</h1>
// 				<Margin height={20} />
// 				<Margin height={25} />
// 				<GoogleSigninButton setErrText={setErrText} />

// 				<Divider />

// 				<AuthTextField
// 					placeholder="Email"
// 					type="text"
// 					value={formDetails.email}
// 					onChange={(val) => onTextChange("email", val)}
// 					error={errors.emailErr}
// 				/>
// 				<Margin height={25} />
// 				<AuthTextField
// 					placeholder="Password"
// 					type="password"
// 					value={formDetails.password}
// 					onChange={(val) => onTextChange("password", val)}
// 					error={errors.passwordErr}
// 				/>

// 				<Margin height={30} />
// 				{errText !== "" && <div className={styles.errText}>{errText}</div>}
// 				<MyButton
// 					text="Login"
// 					loading={loading}
// 					onClick={loginClicked}
// 					enabled={enabled}
// 				/>
// 				<Margin height={15} />
// 				<button className={styles.bottomText} onClick={() => navToRegister()}>
// 					Don&apos;t have an account? <span>Register here</span>
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

// export default Login;

import React from "react";

function login() {
	return <div>login</div>;
}

export default login;
