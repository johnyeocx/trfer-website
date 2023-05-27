import React from "react";
import styles from "../../../styles/General/TabBar/TabBar.module.scss";
import { AppTab, setAppTab } from "@/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";

export enum Tab {
	account = "account",
	services = "services",
}

function TabBar() {
	return (
		<div className={styles.tabContainer}>
			<TabButton
				title="Account"
				thisTab={AppTab.account}
				// tab={tab}
				// setTab={setTab}
			/>
			<TabButton
				title="Services"
				thisTab={AppTab.services}
				// tab={tab}
				// setTab={setTab}
			/>
			{/* <TabButton
				title="Transactions"
				thisTab={AppTab.transactions}
				// tab={tab}
				// setTab={setTab}
			/> */}
		</div>
	);
}

export default TabBar;

export const TabButton = ({ title, thisTab }: any) => {
	const dispatch = useDispatch();
	const tab = useSelector((state: RootState) => state.app.tab);
	const router = useRouter();

	return (
		<button
			className={`${styles.tab} ${tab == thisTab && styles.tabSelected}`}
			onClick={() => {
				// setTab(thisTab);
				dispatch(setAppTab(thisTab));
				router.push(`/${thisTab}`);
			}}
		>
			{title}
		</button>
	);
};
