import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../../styles/Auth/GoogleSigninButton.module.scss";
import googleLogo from "../../../../../public/images/brands/google.png";
import Image from "next/image";
import { auth } from "@/pages/_app";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { AuthService } from "@/services/authService";
import { AuthStatus, setAuthStatus, setShowLoginModal } from "@/redux/appSlice";
import { useDispatch } from "react-redux";
import { AuthErrFuncs } from "@/models/errors/authErrs";
import { useRouter } from "next/router";

type GoogleSigninProps = {
	setErrText: Dispatch<SetStateAction<string>>;
};
function GoogleSigninButton({ setErrText }: GoogleSigninProps) {
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const onSigninClicked = async () => {
		const googleProvider = new GoogleAuthProvider();

		let user;
		try {
			const res = await signInWithPopup(auth, googleProvider);

			user = res.user;

			// await
		} catch (error) {
			setErrText("Failed to sign in. Please try again later.");
			return;
		}

		try {
			const token = await user?.getIdToken();
			await AuthService.extSignIn({ token });
		} catch (error: any) {
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
		<button className={styles.buttonContainer} onClick={onSigninClicked}>
			{loading ? (
				<div className={styles.spinner}></div>
			) : (
				<>
					<div className={styles.logoContainer}>
						<Image
							src={googleLogo}
							alt="google logo"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<p>Sign in with Google</p>
				</>
			)}
		</button>
	);
}

export default GoogleSigninButton;
