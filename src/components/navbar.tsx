import { AuthStatus, setAuthStatus } from "@/redux/appSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Navbar/Navbar.module.scss";
import Margin from "./general/margin";
import { useRouter } from "next/router";
import { accessTokenKey, refreshTokenKey } from "@/misc/constants";
import { setUser } from "@/redux/user/userSlice";

export type NavBarProps = {
	showRight?: boolean;
	showManage?: boolean;
};
function NavBar({ showRight = true, showManage = true }: NavBarProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const status = useSelector((state: RootState) => state.app.authStatus);

	const logout = async () => {
		localStorage.removeItem(accessTokenKey);
		localStorage.removeItem(refreshTokenKey);
		dispatch(setAuthStatus(AuthStatus.none));
		router.push("/");
		// dispatch(setUser(null));
	};

	return (
		<>
			<div className={styles.navContainer}>
				<div className={styles.logoContainer}>trf.</div>
				{showRight && (
					<div className={styles.right}>
						{showManage && (
							<button
								onClick={() => {
									if (status == AuthStatus.loggedIn) {
										router.push("/home");
									} else {
										router.push("/register");
									}
								}}
								className={`${styles.authBtn} ${styles.signUpBtn}`}
							>
								{status == AuthStatus.loggedIn ? "Manage" : "Sign Up"}
							</button>
						)}
						<Margin width={10} />
						<button
							onClick={() => {
								if (status == AuthStatus.loggedIn) {
									logout();
								} else {
									router.push("/login");
								}
							}}
							className={`${styles.authBtn} ${styles.loginBtn}`}
						>
							{status == AuthStatus.loggedIn ? "Logout" : "Login"}
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default NavBar;
