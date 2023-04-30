import { AuthStatus } from "@/redux/appSlice";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Navbar/Navbar.module.scss";
import NotLoggedIn from "./navbar/notLoggedIn";
import LoggedIn from "./navbar/loggedIn";
import Login from "./auth/login";
import { AuthService } from "@/services/authService";

import Logo from "../../public/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartArrowDown,
	faCartFlatbed,
	faCheck,
} from "@fortawesome/pro-solid-svg-icons";
import { faCartShopping } from "@fortawesome/pro-regular-svg-icons";

function NavBar() {
	const status = useSelector((state: RootState) => state.app.authStatus);
	const showLoginModal = useSelector(
		(state: RootState) => state.app.showLoginModal
	);
	// const dispatch = useDispatch();
	// const [loading, setLoading] = useState<boolean>(true);

	// useEffect(() => {
	// 	if (status !== AuthStatus.loggedIn) {
	// 		AuthService.authenticate(dispatch);
	// 	} else {
	// 		setLoading(false);
	// 	}
	// }, []);

	// if (loading) return <></>;
	return (
		<>
			<div className={styles.navContainer}>
				<div className={styles.logoContainer}>
					{/* {status === AuthStatus.loggedIn ? <LoggedIn /> : <NotLoggedIn />} */}
					<Logo />
				</div>
				<FontAwesomeIcon icon={faCartShopping} />
			</div>
			{/* {showLoginModal && <Login />} */}
		</>
	);
}

export default NavBar;
