import React, { useState } from "react";
import styles from "../../../../styles/Services/ManageService/ServicesTabBar.module.scss";
import { TabButton } from "../ServiceTabBar";

enum CreateTab {
	payment,
	authorisation,
}

function CreateTabBar() {
	const [tab, setTab] = useState(CreateTab.payment);
	return (
		<div className={styles.tabBar}>
			<TabButton
				title="Payment"
				tab={tab}
				thisTab={CreateTab.payment}
				setTab={setTab}
			/>
			<TabButton
				title="Authorisation"
				tab={tab}
				thisTab={CreateTab.authorisation}
				setTab={setTab}
			/>
		</div>
	);
}

export default CreateTabBar;
