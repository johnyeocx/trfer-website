import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../../styles/Auth/GoogleSigninButton.module.scss";
import googleLogo from "../../../../../public/images/brands/google.png";
import Image from "next/image";
import { auth } from "@/pages/_app";
import {
	GoogleAuthProvider,
	User,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { AuthService } from "@/services/authService";
import {
	AuthStatus,
	setAuthStatus,
	setPageLoading,
	setShowLoginModal,
} from "@/redux/appSlice";
import { useDispatch } from "react-redux";
import { AuthErrFuncs } from "@/models/errors/authErrs";
import { useRouter } from "next/router";
import { accessTokenKey, refreshTokenKey } from "@/misc/constants";

type GoogleSigninProps = {
	setErrText: Dispatch<SetStateAction<string>>;
	onTokenSuccess: (user: User) => Promise<void>;
	enabled?: boolean;
	text: string;
};

function GoogleSigninButton({
	setErrText,
	onTokenSuccess,
	enabled = true,
	text,
}: GoogleSigninProps) {
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const onSigninClicked = async () => {
		setErrText("");

		if (!enabled) return;

		const googleProvider = new GoogleAuthProvider();
		googleProvider.setCustomParameters({
			prompt: "select_account",
		});

		let user;

		try {
			const res = await signInWithPopup(auth, googleProvider);
			user = res.user;
		} catch (error) {
			setErrText("Failed to sign in. Please try again later.");
			return;
		}

		await onTokenSuccess(user);
		dispatch(setPageLoading(false));
	};

	return (
		<button
			className={`${styles.buttonContainer} ${!enabled && styles.disabledBtn}`}
			onClick={onSigninClicked}
		>
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
					<p>{text}</p>
				</>
			)}
		</button>
	);
}

export default GoogleSigninButton;
