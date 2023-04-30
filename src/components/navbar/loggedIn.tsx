import React from "react";

import styles from "../../styles/Navbar/LoggedIn.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faQrcode } from "@fortawesome/pro-solid-svg-icons";
import { RootState } from "@/redux/store";
import { AppTab, setAppTab } from "@/redux/appSlice";
import { faHouseBlank } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";

function LoggedIn() {
	const dispatch = useDispatch();
	const router = useRouter();
	const appTab = useSelector((state: RootState) => state.app.tab);

	const setTab = (tab: AppTab) => {
		// dispatch(setAppTab(tab));
		router.push(`/${tab}`);
	};

	return (
		<div className={styles.mainContainer}>
			{/* <div className={`${styles.linkContainer}`}> */}
			<button onClick={() => setTab(AppTab.card)}>
				<div
					className={`${styles.tabContainer} ${
						appTab == AppTab.card && styles.tabSelected
					}`}
				>
					<FontAwesomeIcon
						icon={faQrcode}
						className={`${styles.cardIcon} ${styles.icon}`}
					/>
					<p className={styles.tabText}>Card</p>
				</div>
			</button>
			{/* </div> */}

			<div className={`${styles.linkContainer}`}>
				<button onClick={() => setTab(AppTab.explore)}>
					<div
						className={`${styles.tabContainer} ${
							appTab == AppTab.explore && styles.tabSelected
						}`}
					>
						<FontAwesomeIcon
							icon={faMagnifyingGlass}
							className={`${styles.exploreIcon} ${styles.icon}`}
						/>
						<p className={styles.tabText}>Explore</p>
					</div>
				</button>
			</div>

			<div className={`${styles.linkContainer}`}>
				<button onClick={() => setTab(AppTab.home)}>
					<div
						className={`${styles.tabContainer} ${
							appTab == AppTab.home && styles.tabSelected
						}`}
					>
						<FontAwesomeIcon
							icon={faHouseBlank}
							className={`${styles.homeIcon} ${styles.icon}`}
						/>
						<p className={styles.tabText}>Home</p>
					</div>
				</button>
			</div>
		</div>
	);
}

export default LoggedIn;
