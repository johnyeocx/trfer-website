import React from "react";
import styles from "../../styles/Navbar/NotLoggedIn.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setShowLoginModal } from "@/redux/appSlice";

const AuthButton = () => {
	return <button>Sign In</button>;
};

function NotLoggedIn() {
	const dispatch = useDispatch();

	return (
		<div className={styles.mainContainer}>
			<div className={`${styles.linkContainer}`}>
				<Link href="/register">
					<p className={styles.regText}>Register</p>
				</Link>
			</div>
			<div className={styles.divider}></div>
			<button
				className={`${styles.linkContainer}`}
				onClick={() => {
					dispatch(setShowLoginModal(true));
				}}
			>
				<p className={styles.loginText}>Login</p>
			</button>
		</div>
	);
}

export default NotLoggedIn;
