import React, { Dispatch, SetStateAction } from "react";
import styles from "../../../styles/Services/ManageService/ServicesTabBar.module.scss";
import { ServiceTab } from "./ManageService";

type ServicesTabBarProps = {
	tab: ServiceTab;
	setTab: Dispatch<SetStateAction<ServiceTab>>;
};
function ServiceTabBar({ tab, setTab }: ServicesTabBarProps) {
	return (
		<div className={styles.tabBar}>
			<TabButton
				title="Template"
				tab={tab}
				thisTab={ServiceTab.template}
				setTab={setTab}
			/>
			<TabButton
				title="Custom Links"
				tab={tab}
				thisTab={ServiceTab.customLinks}
				setTab={setTab}
			/>
			<TabButton
				title="Transactions"
				tab={tab}
				thisTab={ServiceTab.transactions}
				setTab={setTab}
			/>
		</div>
	);
}

export default ServiceTabBar;

export const TabButton = ({ title, tab, thisTab, setTab }: any) => {
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
