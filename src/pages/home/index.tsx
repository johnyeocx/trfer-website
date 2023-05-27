import { RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Home/Home.module.scss";
import { useRouter } from "next/router";

import LoadingPage from "@/components/general/LoadingPage";

import NavBar from "@/components/general/Nav/NavBar";
import Account from "@/components/home/account/Account";

import { GenFuncs } from "@/misc/helperFunctions/GenFuncs";
import TabBar from "@/components/general/Nav/TabBar";
import { AppTab, setAppTab } from "@/redux/appSlice";
import LoadingFill from "@/components/general/LoadingFill";

export enum Tab {
	customise,
	account,
	transactions,
	create,
}

function HomePage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.userState.user);
	const pageLoading = useSelector((state: RootState) => state.app.loading);
	const [loading, setLoading] = useState<boolean>(true);
	const [linkToken, setLinkToken] = useState(null);
	const [tab, setTab] = useState(Tab.create);

	const detailsNotCompleted = () => {
		router.push("/onboarding");
	};

	useEffect(() => {
		(async () => {
			dispatch(setAppTab(AppTab.account));
			const success = await GenFuncs.initPage(
				dispatch,
				router,
				detailsNotCompleted
			);

			if (success) {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<>
			{pageLoading && <LoadingPage bgColor="rgba(20, 20, 20, 0.3)" />}

			<div className={styles.pageContainer}>
				<NavBar showManage={false} />
				<TabBar />
				{loading ? (
					// <LoadingPage />
					<LoadingFill />
				) : (
					<div className={styles.contentContainer}>
						<Account />
					</div>
				)}
			</div>
		</>
	);
}

export default HomePage;

export const TabButton = ({ title, thisTab, tab, setTab }: any) => {
	return (
		<button
			className={`${styles.tab} ${tab == thisTab && styles.tabSelected}`}
			onClick={() => {
				setTab(thisTab);
			}}
		>
			{title}
		</button>
	);
};
